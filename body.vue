<script>
import moment from 'moment'
import _ from "lodash";

export default {
    data:function(){

        return {
            local_list:[],
            start:null,
            end:null,
            end_click:false
            
        }
    },
    props:{

        date:{
            type:String,
            required:true,
        
        },
        today:{
            type:String,
            required:true
        },
        data:{
            type:Array,
            default:function(){
                return []
            }
        },
        disabled:{
            type:Boolean,
            default:false
        },
        edit_data:{
            type:Array,
            default:[]
        },
        include_today:{
            type:Boolean,
            default:true
        }

    },
    methods: {
        

    },
    computed: {

            list:{
                get:function(){
                    this.local_list=[]
                    var _date=moment(this.date);
                    var _start_date=_date.clone().set("date",1);
                    var _end_date=_date.clone().set("date",_date.daysInMonth());
                   
                   Array(_start_date.day()).fill(0).map((x,index)=>{
                   
                       var _d = _start_date.clone().subtract(index+1,"day")
                        this.local_list.unshift(
                            { date:_d, id: _d.format("YYYY-MM-DD") }
                         )
                    })
                    Array(_date.daysInMonth()).fill(0).map((xx,index)=>{
                        
                        var _d = _start_date.clone().add(index,"day");

                        this.local_list.push(
                            {
                                date:_d,
                                id:_d.format("YYYY-MM-DD")
                            }
                            
                        )
                   
                    })
                   
                    Array( 6-_end_date.days() ).fill(0).map((xx,index)=>{

                        var _d = _start_date.clone().add(index,"day").add(1,"month");

                        this.local_list.push({date:_d,id:_d.format("YYYY-MM-DD")});

                    })
                   this.local_list= this.local_list.map(x=>{
                        x.is_today=this.is_today(x.id)
                        x.is_overdue=this.is_overdue(x.date)
                        return x;
                    })

                    return this.local_list;
            },
            set:function(value){
                this.local_list=value;
            }
        },

        gear:function(){
            return this.data||[]
        }
    },
  
    mounted() {


    },
    methods: {
        init_status:function(){

            this.start=null;
            this.end=null;
            this.end_click=false;
        },
        is_today:function(_date){
           return _date==this.today

        },
        is_overdue:function(_date){
            //console.log(_date, moment(_date).isBefore(this.today,"day"))
            return _date.isBefore(this.today,"day")
        },
        clickHandler:function(_date){

            if(this.start==null){
            
                this.start=_date
            
            }else{
            
                this.end=_date
                this.end_click=true;

                this.$emit('selected',{ start:this.start,end:this.end } )
            }
        },
        moveHandler:function(_date){
         if(this.end_click) return;
            if(this.start!=null){
                this.end=_date
            }
        },
        is_selected:function(_data){
            if(this.start==null && this.end==null) return false;
            
            if(this.start!=null && this.end==null){
                if(_data.id == this.start.id){
                    return true
                }
            }


            if( this.start != null  && this.end != null ){
                var  _d =  this.start.date.isSameOrBefore(this.end.date,"day") 
                var min=null;
                var max = null;
                if(_d){
                    min=this.start.date
                    max=this.end.date
                }else{
                    min=this.end.date
                    max=this.start.date
                }
                if(this.edit_data.length>0){

                    return _data.date.isBetween(min,max,"day","[]") && _.findIndex(this.edit_data,{id:_data.id})>=0
                }else{

                    return _data.date.isBetween(min,max,"day","[]");
                }
            }
        },
        filterData:function(_data){

            let index =  _.findIndex(this.gear,{ id:_data.id });

            if(index>=0){
                //console.log(this.gear[index].component_data)
                return this.gear[index].component_data;

            }else{
                return false;
            }
        },
        isEditData:function(item){

            if(this.edit_data.length<=0) return false;
            if( _.findIndex(this.edit_data,{id:item.id} )>=0){

                return false
            }else{

                return true
            }
           

            
        }
    },
    render(h){

           /// console.log(this.$scopedSlots)
                //console.log(this)
           /*  const slots = Object.keys(this.$scopedSlots)
            .reduce((arr, key) => arr.concat(this.$scopedSlots[key]), [])
            .map(vnode=>{
                vnode.context=this._self;
                return vnode
            })
 */
        return <div> 
                
                <div class="dateschedule_body_header">
                    <div>Sun.</div>
                    <div>Mon.</div>
                    <div>Tues.</div>
                    <div>Wed.</div>
                    <div>Thur.</div>
                    <div>Fri.</div>
                    <div>Sat.</div>
                </div>
                <div class="dateschedule_body">
                    {
                        this.list.map((item,index)=>{
                            return <div class={ 
                                    {
                                        "tody":item.is_today,
                                        'grid':true,
                                        "overdue":item.is_overdue,
                                        "selected":this.is_selected(item),
                                        "disabled":this.disabled,
                                        "edit_data":this.isEditData(item),
                                        "include_today":item.is_today && !this.include_today
                                    }}
                                    on-click={ ()=>{ this.clickHandler(item) } }
                                    on-mouseover={ ()=>{ this.moveHandler(item) } }>
                                    <div class="body_grid_date">{ moment(item.date).format("DD") }</div>
                                        {
                                            this.$scopedSlots.default(this.filterData( item ))
                                        }
                                </div>
                        })
                    }

                </div>
        </div>

    }
}
</script>

<style scoped>
    .dateschedule_body,.dateschedule_body_header{
        width:100%;
        overflow:hidden;
    }
    .dateschedule_body>div,.dateschedule_body_header>div{
        width:calc( 100% / 7 );
        float:left;
        height:100px;
    }
    .body_grid_date{
        width:100%;
        font-weight:bold;
        text-align:center;
        font-size:14px;
        width:25px;
        height:25px;
        line-height:25px;
    }
    .dateschedule_body_header>div{
        height:30px;
        display:grid;
        align-items:center;
        justify-content:center;
        font-size:14px;
        font-weight:bold;
        border:1px solid #c8c8c8;
        border-bottom:0px;
        border-right:0px;
        border-top:0px;

    }
    .dateschedule_body_header>div:last-child{
    }
    .dateschedule_body_header{
        /*border-bottom:1px solid #c8c8c8;
        border-right:1px solid #c8c8c8;*/
        border-bottom:1px solid #c8c8c8;
    }
    .grid{
        border:1px solid #c8c8c8;
        border-right:0px;
        border-top:0px;
        cursor: pointer;
        padding:3px;

    }
    .tody{
/*         border:1px solid #ff0000;
 */    }
    .overdue,.disabled,.edit_data,.include_today{
        cursor:auto;
        pointer-events:none;
    }
    .overdue>*,.disabled>*,.edit_data>*,.include_today>*{
        opacity:0.3;
    }
    .selected{

        background-color:rgba(150,150,150,.1)
    }
   
   .tody .body_grid_date{
   
       background-color:#ff0000;
       border-radius:100%;
    
   }
    
    
</style>