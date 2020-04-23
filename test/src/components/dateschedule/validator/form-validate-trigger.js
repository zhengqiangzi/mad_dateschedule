import Vue from "vue";

export default function () {


	return {

		bind: function () {

		},
		update: function (el, binding, vnode, oldVnode) {

			//console.dir(el.value)
			console.log(vnode)
			console.log(oldVnode)
			//	console.log(vnode)

			return vnode;
		}


	}

}