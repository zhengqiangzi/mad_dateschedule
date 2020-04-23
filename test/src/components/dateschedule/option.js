export let  getFnList = function () {

    if (this.valueFilter.indexOf("odddays") >= 0 && this.valueFilter.indexOf("evendays") >= 0) {
        return []
    }
    if (this.valueFilter.length == 4) return [];
    return this.valueFilter.map(x => {
        return filter_list[x]
    })
}


var filter_list = {

    odddays: function (_date) {
        
        if(_date==null) return null;


        if(_date.day() % 2 == 1){

            return _date
        
        }else{

            return null;
        }
    },
    evendays: function (_date) {
        if (_date == null) return null;

        if( _date.day() % 2 == 0 ) {

            return _date;
            
        }else{

            return null;
        }
    },
    workdays: function (_date) {
        if (_date == null) return null;

        if(_date.day() != 0 && _date.day() != 6){

            return _date
        }else{

            return null;
        }


    },
    weekends: function (_date) {
        
        if (_date == null) return null;
        if (_date.day() == 0 || _date.day() == 6 ){

            return _date
        }else{

            return null
        }
//        return 
    }

}

export let dateTypeFn=function(fn,data){

    return fn().reduce((_d, _fn) => {
        return _fn(_d)
    }, data);


}

export let methods={

    /**获取选中表格中的数据 */
    getSelectedData: function () {
        var { min, max } = this.orderByDate()
        var j = min.clone();
        var _result = [];
        /**提取选择数据中的开始日期和结束日期 */
        this.form.date_title = min.isSame(max, "day") ?
            min.format("YYYY/MM/DD")
            :
            min.format("YYYY/MM/DD") + " ---- " + max.format("YYYY/MM/DD")


        while (j.isSameOrBefore(max)) {
            /*如果调用实例的时候传入了 edit_ranger参数 */
            if (this.edit_ranger.length > 0) {
                //如果当前表格中中的数据不在指定编辑数据里面的话则结束本次循环，继续下一次
                var _ind = _.findIndex(this.edit_ranger, { id: j.format("YYYY-MM-DD") })
                if (_ind < 0) {
                    j.add(1, 'day');
                    continue;
                }
            }
            if (!this.include_today && this.initdate == j.format("YYYY-MM-DD") )
            {
                j.add(1, 'day');
                continue;

            }

            //如果当前表格中的数据在数据源表格中找到的话
            var _index = _.findIndex(this.list, { id: j.format("YYYY-MM-DD") });
            if (_index >= 0) {
                _result.push(this.list[_index].component_data)
            }
            j.add(1, "day")
        }
        //  console.log( JSON.stringify(_result ))
        /**
            因为多个表格中的数据可能不一样，所以要调用唯一性
            如果 数据都是一样则弹出层时会默认填入中其它，否则数据为null
         */
        var click = _.uniq(_result.map(x => x.clicks))
        var budget = _.uniq(_result.map(x => x.budget))
        var impression = _.uniq(_result.map(x => x.impressions))

        //console.log( JSON.stringify(budget) )

        if (click.length == 1) {
            this.form.clicks = click[0]
        } else {
            this.form.clicks = null
        }
        if (impression.length == 1) {
            this.form.impressions = impression[0]
        } else {
            this.form.impressions = null
        }
        // console.log( budget.length ,budget[0])
        if (budget.length == 1) {
            //   console.log(1)
            this.form.budget = budget[0]

        } else {
            this.form.budget = null
        }
    },
    //选取框完成时调用的事件
    selectedHandler: function (_selected_date) {
        this.visible = true;
        this.selected_data = _selected_date;
        this.getSelectedData();

    },
    //关闭弹出层回调函数
    handleClose: function (done) {
        done();
        this.visible = false;
        this.$refs.dateschedule.init_status()
        this.valueFilter = []
    },
//取消按钮点击回调函数
    diaClickHandler: function () {
        this.visible = false;
        this.$refs.dateschedule.init_status()
        this.valueFilter = []
    },
    //排序二个日期
    orderByDate: function () {
        var m = this.selected_data.start.date.isBefore(this.selected_data.end.date)
        var min;
        var max;
        if (m) {
            min = this.selected_data.start.date;
            max = this.selected_data.end.date
        } else {
            min = this.selected_data.end.date;
            max = this.selected_data.start.date
        }
        return { min, max }
    },
    //确定按钮 点击回调函数
    diaSubmitHandler: function () {
        var { min, max } = this.orderByDate()
        var j = min.clone();
        while (j.isSameOrBefore(max)) {

            //数据是否在可编辑里面
            if (this.edit_ranger.length > 0) {
                var _ind = _.findIndex(this.edit_ranger, { id: j.format("YYYY-MM-DD") })
                if (_ind < 0) {
                    j.add(1, 'day');
                    continue;
                }
            }

            //数据是否属于日期可以添加的类型
            if (!dateTypeFn(getFnList.bind(this), j)) {
                /*         
                var _index =  _.findIndex( this.list,{id:j.format("YYYY-MM-DD")} );
                if( _index >=0 ){
                    this.list.splice(_index,1)
                } */
                j.add(1, 'day');
                continue
            }

            if (!this.include_today && this.initdate == j.format("YYYY-MM-DD")) {
                j.add(1, 'day');
                continue;
            }



            var _index = _.findIndex(this.list, { id: j.format("YYYY-MM-DD") });
            if (_index >= 0) {
                this.list.splice(_index, 1)
            }
            this.list.push({
                id: j.format("YYYY-MM-DD"),
                date: j,
                component_data: {
                    clicks: this.form.clicks,
                    impressions: this.form.impressions,
                    budget: this.form.budget
                }
            })
            j.add(1, 'day');
        }
        this.visible = false;
        this.$refs.dateschedule.init_status()
        this.valueFilter = []

        this.$emit("input", this.list)

    },
    //清除按钮点击回调函数
    diaClearHandler: function () {

        var { min, max } = this.orderByDate()
        var j = min.clone();
        while (j.isSameOrBefore(max)) {
            if (this.edit_ranger.length > 0) {
                var _ind = _.findIndex(this.edit_ranger, { id: j.format("YYYY-MM-DD") })
                if (_ind < 0) {
                    j.add(1, 'day');
                    continue;
                }
            }
            if (!dateTypeFn(getFnList.bind(this), j)) {
                j.add(1, 'day');
                continue
            }

            if (!this.include_today && this.initdate == j.format("YYYY-MM-DD")) {
                j.add(1, 'day');
                continue;

            }


            var _index = _.findIndex(this.list, { id: j.format("YYYY-MM-DD") });
            if (_index >= 0) {
                this.list.splice(_index, 1)
            }
            j.add(1, 'day')
        }
        this.visible = false;
        this.$refs.dateschedule.init_status()
        this.valueFilter = []
        this.$emit("input", this.list)
    },
    //弹出层中输入框值更新时触发的回调函数
    formClickHandler: function (att, e) {
        // console.log(att,e)
        this.form[att] = e
    },
    //弹出层中设置值 的条件回调函数
    valueFilterChangerHandler: function (v) {
        this.valueFilter = v;
    }

}