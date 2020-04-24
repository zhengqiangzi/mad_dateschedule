<script>

    import dateschedule from './index.vue';
    import Grid from './grid';
    import moment from "moment"
    import Vue from 'vue/dist/vue.esm.js';
    import { getFnList , dateTypeFn,methods } from "./option";

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
      
        methods: {
            ...methods
        },
        render(h) {
 
            const budget_directives=[
                {name:'positive-float'},
                {name:"model",value:this.form.budget},
                {name: 'format-number', value: 2 ,modifiers:{ nozero:true } },
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
                        title="计划设置"
                        visible={ this.visible }
                        before-close={ this.handleClose }
                        close-on-press-escape={ false }
                        width="70%"
                        close-on-click-modal={false}
                        on-closed={ ()=>{ this.fs._reset() } } >
                        <vue-form state={this.fs}>
                            <div class="item-dateschedule-main-title"><h3>周期 {this.form.date_title } </h3></div>
                            <div class="item-dateschedule">
                                <div class="item-dateschedule_title"><b>时间筛选</b></div>
                                <div>
                                    <el-checkbox-group value={this.valueFilter} on-input={ this.valueFilterChangerHandler }>
                                        <el-checkbox  label="odddays">单日</el-checkbox>
                                        <el-checkbox  label="evendays">双日</el-checkbox>
                                        <el-checkbox  label="workdays">工作日</el-checkbox>
                                        <el-checkbox  label="weekends">周末</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div>
                                <div class="item-dateschedule">
                                    <div  class="item-dateschedule_title"><b>单日预算:</b></div>
                                    <validate>
                                        <el-input 
                                            placeholder="请输入预算"  
                                            value={this.form.budget } 
                                            on-input={ (e)=>{ this.formClickHandler('budget',e) } }
                                            { ...{ directives:budget_directives } }
                                            required
                                            name="budget"
                                            big-than={0}
                                            number-range={ { "target":[0,100000000] } } >
                                            <template slot="append"><i class="fa fa-jpy"></i></template>
                                        </el-input>
                                        {
                                            !this.fs.budget ? null:
                                            <field-messages name="budget"  class="text-danger" show={ (this.fs.budget.$dirty || this.fs.budget.$touched || this.fs.budget.$submitted).toString() } >
                                                <div slot="required">请输入预算</div>
                                                <div slot="number-range">输入范围(0-100,000,000),支持两位小数!</div>
                                                <div slot="big-than">输入范围(0-100,000,000),支持两位小数!</div>
                                            </field-messages>
                                        }
                                    </validate>

                                </div>
                                <div class="item-dateschedule">
                                    <div  class="item-dateschedule_title"><b>单日展示限制（*1000）:</b></div>
                                    <div>
                                        <validate>
                                        <el-input placeholder="请输入展示数" 
                                         value={this.form.impressions } 
                                         on-input={ (e)=>{ this.formClickHandler('impressions',e) } }
                                         v-positive-integer
                                         required
                                         name="impressions"
                                        big-than={0}
                                        number-range={ { "target":[0,100000000] } }
                                        {...{directives:impressions_directives}}>
                                            <template slot="append"><i class="fa fa-eye"></i></template>
                                         </el-input>
                                         {
                                           !this.fs.impressions ? null :
                                            <field-messages name="impressions" class="text-danger" show={ (this.fs.impressions.$dirty || this.fs.impressions.$touched || this.fs.impressions.$submitted).toString() }>
                                                <div slot="required">请输入展示数!</div>
                                                <div slot="number-range">输入范围(0-100,000,000),支持整数!</div>
                                                <div slot="big-than">输入范围(0-100,000,000),支持两位小数!</div>
                                            </field-messages>
                                         }
                                         </validate>
                                    </div>
                                </div>

                                <div class="item-dateschedule">
                                    <div  class="item-dateschedule_title"><b>单日点击限制:</b></div>
                                    <div>
                                        <validate>
                                            <el-input 
                                            placeholder="请输入点击数"  
                                            name="click"
                                            value={this.form.clicks } 
                                            on-input={ (e)=>{ this.formClickHandler('clicks',e) } }
                                            name="clicks"
                                            required
                                            big-than={0}
                                            number-range={ { "target":[0,100000000] } }
                                            { ...{ directives:clicks_directives} }>
                                                <template slot="append"><i class="fa fa-hand-pointer-o"></i></template>
                                            </el-input>
                                           { 
                                                !this.fs.clicks ? null : 
                                                <field-messages name="clicks" class="text-danger" show={ (this.fs.clicks.$dirty || this.fs.clicks.$touched || this.fs.clicks.$submitted).toString() } >
                                                    <div slot="required">请输入点击数!</div>
                                                    <div slot="number-range">输入范围(0-100,000,000),支持整数!</div>
                                                    <div slot="big-than">输入范围(0-100,000,000),支持两位小数!</div>
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