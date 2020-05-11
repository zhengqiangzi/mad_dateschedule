<script>
import moment from 'moment'
export default {
    data:function(){
        return {

        }
    },
    props:{

        date:{
            type:String,
            required:true
        }

    },
    methods: {
        preHandler:function(){

            this.$emit("pre")
        },
        nextHandler:function(){

            this.$emit("next")
        }
    },
    render(h){

        return   <div class="dateschedule_header">
                    <div class="pre_btn"><a href="javascript:void(0)"  on-click={ this.preHandler }><i class="el-icon-arrow-left"></i></a></div>
                    <div class="date_title">{ moment(this.date).format("YYYY-MM") }</div>
                    <div class="next_btn" ><a href="javascript:void(0)" on-click={ this.nextHandler }><i class="el-icon-arrow-right"></i></a></div>
                </div>


    }
}
</script>


<style scoped>
 .dateschedule_header{
        width:100%;
        display: grid;
        grid-template-columns: 33.333% 33.333% 33.3333%;
        border-bottom:1px solid #c8c8c8;
        border-left:1px solid #c8c8c8;
    }
    .dateschedule_header>div{
        display:grid;
        height:40px;
        align-items:center;
    }
    .pre_btn{
        justify-content: flex-start;
        font-size:26px;
        font-weight:bold;
    }
    .next_btn{
        justify-content: flex-end;
        font-size:26px;
        font-weight:bold;
    }
  
    .date_title{

        justify-content: center;
        font-size:16px;
        font-weight:bold;
    }
    
</style>