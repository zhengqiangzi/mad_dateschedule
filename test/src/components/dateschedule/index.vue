<script>
import header from './header'
import body from './body'
import moment from 'moment'
export default {
    data:function(){
        return { 
            local_head_data:null
        }
    },
    props:{
        initdate:{
            type:String,
            required:false,
            default:function(){
                return moment().format("YYYY-MM-DD")
            }
        },
        value:{
            type:Array,
            required:true
        },
        disabled:{
            type:Boolean,
            default:false
        },
        edit_ranger:{
            type:Array,
            default:[]
        },
        include_today:{
            type:Boolean,
            default:false
        }

    },
    components:{

        "date-header":header,
        "date-body":body
    },
    computed: {
        head_date:{
            get:function(){
                if(this.local_head_data==null){

                    return this.initdate
                }else{

                     return this.local_head_data
                }
            },
            set:function(value){

                this.local_head_data=value
            }

        }
    },
    methods: {

        preHandler:function(){

            this.head_date = moment(this.head_date).subtract(1,"month").format("YYYY-MM-DD")

           // this.initdate = moment(this.initdate).add(1,"month")
        },
        nextHandler:function(){

            this.head_date = moment(this.head_date).add(1,"month").format("YYYY-MM-DD")
        },
        selectedHandler:function(_selected_date){

           // console.log(_selected_date)

            this.$emit("selected",_selected_date)
        },
        init_status(){

            this.$refs.body.init_status();

        }


    },
    render(h){

     /*  console.log( this )
        const slots = Object.keys(this.$scopedSlots)
            .reduce((arr, key) => arr.concat(this.$scopedSlots[key]), [])
            .map(vnode=>{
                vnode.context=this._self;
                return vnode
            }) */

        return <div class="dateschedule_container">
          
            <date-header on-pre={ this.preHandler } on-next={ this.nextHandler } date={ this.head_date } ></date-header>
            <date-body 
                date={ this.head_date } 
                today={ this.initdate } 
                on-selected={ this.selectedHandler } 
                ref="body"
                include_today={ this.include_today }
                disabled={ this.disabled }
                edit_data= { this.edit_ranger }
                data={ this.value }>
                   {
                       this.$scopedSlots.grid

                   }
            </date-body>
        </div>
    }
}
</script>

<style scoped>

    .dateschedule_container{
        width:100%;
        overflow:hidden;
        border:1px solid #c8c8c8;
        border-bottom:0px;
        border-left:0px;
    }
   


</style>