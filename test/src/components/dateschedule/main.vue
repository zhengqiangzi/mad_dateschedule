<script>

    import dateschedule from './index.vue';
    import Grid from './grid';
    import moment from "moment"
    import Vue from 'vue/dist/vue.esm.js';
    import { getFnList , dateTypeFn,methods } from "./option";
    import { positive_integer, positive_float, format_number } from "./validator";

    export default {
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
            value:{
                type:Array,
                default:function(){

                    return []
                }
            },
            edit_ranger:{
                type:Array,
                default:function(){

                    return []
                }
            },
            initdate:{
                type:String,
                default:function(){

                    return moment().format("YYYY-MM-DD")
                }
            },
            include_today:{
                type:Boolean,
                default:function(){
                    return true
                }
            }

        },
        data:function(){
            return {
                valueFilter:[],
                visible:false,
                form:{
                    clicks:null,
                    budget:null,
                    impressions:null,
                    date_title:null
                },
                selected_data:{
                    start:null,
                    end:null
                },
                fs:{}
            }
        },
        components:{
            "date-schedule":dateschedule,
            "date-grid":Grid
        },
        computed: {
            list:function(){

                return this.value
            }
        },
         directives: {
            "positive-float": positive_float, //正浮点数
            "format-number": format_number, //保留二位小数
            "positive-integer": positive_integer, //正整数

        },
        methods: {
            ...methods
        },
        render(h) {
 
            const budget_directives=[
                {name:'positive-float'},
                {name:"model",value:this.form.budget},
                { name: 'format-number', value: 2 ,modifiers:{ nozero:true } },
            ]
            const impressions_directives=[
                {name:"model",value:this.form.impressions},
                {name:'positive-integer'}
            ]
            const clicks_directives=[
                {name:"model",value:this.form.clicks},
                {name:'positive-integer'}
            ]

            return <div>
                    <date-schedule 
                        disabled={ this.disabled } 
                        value={ this.list } 
                        ref="dateschedule" 
                        edit_ranger={ this.edit_ranger } 
                        initdate={ this.initdate } 
                        include_today={ this.include_today }
                        on-selected={ this.selectedHandler }

                        {...{scopedSlots:{
                            grid:props=>{
                                return  <date-grid {...{ props } }></date-grid>
                            }
                        }}}>
                    </date-schedule>
                    <el-dialog
                        title="提示"
                        visible={ this.visible }
                        before-close={ this.handleClose }
                        close-on-press-escape={ false }
                        width="70%"
                        close-on-click-modal={false}
                        on-closed={ ()=>{ this.fs._reset() } } >
                        <vue-form state={this.fs}>
                            <div class="item-dateschedule-main-title"><h3>Time period {this.form.date_title } </h3></div>
                            <div class="item-dateschedule">
                                <div class="item-dateschedule_title"><b>QSelect</b></div>
                                <div>
                                    <el-checkbox-group value={this.valueFilter} on-input={ this.valueFilterChangerHandler }>
                                        <el-checkbox  label="odddays">Odd days</el-checkbox>
                                        <el-checkbox  label="evendays">Even days</el-checkbox>
                                        <el-checkbox  label="workdays">Workdays</el-checkbox>
                                        <el-checkbox  label="weekends">Weekends</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div>
                                <div class="item-dateschedule">
                                    <div  class="item-dateschedule_title"><b>Daily budget limit:</b></div>
                                    <validate>
                                        <el-input 
                                            placeholder="请输入内容"  
                                            value={this.form.budget } 
                                            on-input={ (e)=>{ this.formClickHandler('budget',e) } }
                                            { ...{ directives:budget_directives } }
                                            required
                                            name="budget"
                                            big-than={0}>
                                            <template slot="append"><i class="fa fa-jpy"></i></template>
                                        </el-input>
                                        {
                                            !this.fs.budget ? null:
                                            <field-messages name="budget"  class="text-danger" show={ (this.fs.budget.$dirty || this.fs.budget.$touched || this.fs.budget.$submitted).toString() } >
                                                <div slot="required">Please enter daily budget</div>
                                                <div slot="big-than">the budget should be more than 0</div>
                                            </field-messages>
                                        }
                                    </validate>

                                </div>
                                <div class="item-dateschedule">
                                    <div  class="item-dateschedule_title"><b>Daily impressions limit（*1000）:</b></div>
                                    <div>
                                        <validate>
                                        <el-input placeholder="请输入内容" 
                                         value={this.form.impressions } 
                                         on-input={ (e)=>{ this.formClickHandler('impressions',e) } }
                                         v-positive-integer
                                         required
                                         name="impressions"
                                        big-than={0}
                                        {...{directives:impressions_directives}}>
                                            <template slot="append"><i class="fa fa-eye"></i></template>
                                         </el-input>
                                         {
                                           !this.fs.impressions ? null :
                                            <field-messages name="impressions" class="text-danger" show={ (this.fs.impressions.$dirty || this.fs.impressions.$touched || this.fs.impressions.$submitted).toString() }>
                                                <div slot="required">Please enter daily impressions</div>
                                                <div slot="big-than">the impressions should be more than 0</div>
                                            </field-messages>
                                         }
                                         </validate>
                                    </div>
                                </div>

                                <div class="item-dateschedule">
                                    <div  class="item-dateschedule_title"><b>Daily clicks limit:</b></div>
                                    <div>
                                        <validate>
                                            <el-input 
                                            placeholder="请输入内容"  
                                            name="click"
                                            value={this.form.clicks } 
                                            on-input={ (e)=>{ this.formClickHandler('clicks',e) } }
                                            name="clicks"
                                            required
                                            big-than={0}
                                            { ...{ directives:clicks_directives} }>
                                                <template slot="append"><i class="fa fa-hand-pointer-o"></i></template>
                                            </el-input>
                                           { 
                                                !this.fs.clicks ? null : 
                                                <field-messages name="clicks" class="text-danger" show={ (this.fs.clicks.$dirty || this.fs.clicks.$touched || this.fs.clicks.$submitted).toString() } >
                                                    <div slot="required">Please enter daily clicks</div>
                                                    <div slot="big-than">the daily clicks should be more than 0</div>
                                                </field-messages>
                                           }
                                        </validate>
                                    </div>
                                </div>
                            </div>
                        </vue-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" on-click={ this.diaSubmitHandler } disabled={this.fs.$invalid}  >确 定</el-button>
                            <el-button type="danger" on-click={ this.diaClearHandler } >清 除</el-button>
                            <el-button on-click={ this.diaClickHandler} >取 消</el-button>
                        </div>
                    </el-dialog>
                </div>
        }
        
    }
</script>

<style>
    *{
        box-sizing:border-box;

    }
    body{
        font-size:12px;
    }
    a,a:hover{
        text-decoration:none;
    }
    .item-dateschedule{
        margin-bottom:10px;
        width:100%;
        overflow:hidden;
    }
    .item-dateschedule_title{
        margin-bottom:10px;
        width:100%;
        overflow:hidden;
    }
    .item-dateschedule-main-title{
        width:100%;
        overflow:hidden;
        text-align:center;
        margin-bottom:20px;
        font-weight:bold;
    }
</style>