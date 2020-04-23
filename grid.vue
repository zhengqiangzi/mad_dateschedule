<script>
export default {
    data:function(){
        return {


        }
    },
    props:["clicks","budget","impressions"],
    render(h){

        return <div class="grid_container">
                {this.budget ? ( <div title={ 'budget : '+ this.budget }><span><i class="fa fa-jpy" aria-hidden="true"></i>  </span> <span>{ this.budget }</span> </div> ):null}
                {this.impressions ? ( <div title={ 'impressions : '+ this.impressions }><span><i class="fa fa-eye"></i>  </span> <span>{ this.impressions }</span> </div> ):null}
                {this.clicks ? ( <div  title={ 'clicks : '+ this.clicks }><span><i class="fa fa-hand-pointer-o"></i>  </span> <span>{ this.clicks }</span> </div> ):null}
        </div>
    }
}
</script>

<style scoped>
    .grid_container{
        width:100%;
        overflow:hidden;
        display:grid;
        padding:5px;
        font-size:12px;
        color:rgba(0,0,0,.7)
    }
    .grid_container>div{
        padding:3px;
        width: 90%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>