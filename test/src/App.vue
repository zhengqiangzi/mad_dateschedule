<script>
import datescheduletable from "./components/dateschedule/main"
import moment from "moment";

export default {
    data:function(){
        return {
            include_tody:true,
            disabled:false,
            list: []/*  (function(){
                return Array(30).fill(0).map((x,i)=>{
                    return {
                        id:moment().add(i,"day").format("YYYY-MM-DD"),
                        date:moment().add(i,"day"),
                        component_data:{
                            clicks:Math.ceil(Math.random()*10000),
                            impressions:Math.ceil(Math.random()*10000),
                            budget:Math.ceil(Math.random()*10000).toFixed(2)
                        }
                    }
                })
            })() */,

            edit_ranger:[]  /* (function(){
                    return Array(10).fill(0).map((x,i)=>{
                        var k=Math.ceil(Math.random()*10);
                        return {
                            id:moment().add(k,"day").format("YYYY-MM-DD"),
                        }
                    })
                })() */,

            initdate:moment().format("YYYY-MM-DD"),
        }
    },
    template:`<div class="schedule">
    <date-schedule-table :include_today="include_tody" :disabled="disabled" v-model="list" :edit_ranger="edit_ranger" :initdate="initdate"> 
    </date-schedule-table>
</div>`,
    components:{
        "date-schedule-table":datescheduletable

    },
    methods: {
    /*     selectedDateHandler:function(_ranger){

            console.log(_ranger)

        } */
     
    },
    mounted() {
       var _this=  this;
        
        setTimeout(function(){
               _this.list =  (function(){
                    return Array(30).fill(0).map((x,i)=>{
                                return {
                                    id:moment().add(i,"day").format("YYYY-MM-DD"),
                                    date:moment().add(i,"day"),
                                    component_data:{
                                        clicks:Math.ceil(Math.random()*10000),
                                        impressions:Math.ceil(Math.random()*10000),
                                        budget:Math.ceil(Math.random()*10000).toFixed(2)
                                    }
                                }
                            })
                    })() 
        },3000)  


    },
}
</script>

<style scoped>
    .schedule{
        background-color:#fff;
        position:relative;
    }
 /*    .edit{

      pointer-events: none;
    }
    .edit:after{
        content:"";
        display:block;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
      background:rgba(150,150,150,.3);
    } */

</style>