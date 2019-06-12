<template>
	<div class="edu">
		<div class="question_top">
			<van-nav-bar
			  title="学习范围设置"
			  left-text="返回"
			  right-text="确认"
			  @click-left="$router.go(-1)"
			  @click-right="onClickRight"
			  left-arrow
			/>
		</div>

		<div class="main_content">
			<van-cell title="年级" is-link :value="grade2" @click="show=true" />
			<van-cell title="科目" is-link :value="subject2" @click="show2=true" />
			<van-cell title="每次测试题目数" :value="0" ><van-stepper v-model="question_num" /></van-cell>
			
			<van-actionsheet
			  v-model="show"
			  :actions="grade"
			  @select="onSelect"
			/>

			<van-actionsheet
			  v-model="show2"
			  :actions="subject"
			  @select="onSelect2"
			/>
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				grade:[{name:'其他',id:0}],
				grade2:'其他',
				grade_id:0,
				subject:[{name:'其他',id:0}],
				subject2:'其他',
				subject_id:0,
				question_num:1,
				show:false,
				show2:false,
				gradeinfo:null,
				subjectinfo:null,
			}
		},
		methods:{
			onSelect(e){
				this.show = false;
				this.grade2 = e.name;
				for(var i=0;i<this.gradeinfo.length;i++){
					if(this.gradeinfo[i].name == e.name){
						this.grade_id = this.gradeinfo[i].id;
					}else{
						this.grade_id = 0;
					}
				}
			},
			onSelect2(e){
				this.show2 = false;
				this.subject2 = e.name;
				for(var i=0;i<this.subjectinfo.length;i++){
					if(this.subjectinfo[i].name == e.name){
						this.subject_id = this.subjectinfo[i].id;
					}else{
						this.subject_id = 0;
					}
				}
			},
			onClickRight:function(){
				var _this = this;
				this.$post(this.ROOT_URL + "Edu/user/edit_learning_scope",{grade_id:this.grade_id,subject_id:this.subject_id,question_num:this.question_num}).then(function(res){
					if(res.code==200){
						_this.$toast({position:'bottom',message:'设置成功！'});
					}else{
						_this.$toast({position:'bottom',message:'设置失败！'});
					}
					// _this.$router.go(-1);
				});
			},
			
		},
		mounted(){
			var _this = this;
			this.$get(this.ROOT_URL + "Edu/user/get_grade_subject").then(function(res){
				console.log(res);
				for(var i=0;i<res.data.grade.length;i++){
					_this.grade.push({name:res.data.grade[i].name});
					if(res.data.extend.grade_id == res.data.grade[i].id){
						_this.grade2 = res.data.grade[i].name;
						_this.grade_id = res.data.grade[i].id;
					}
				}
				for(var i=0;i<res.data.subject.length;i++){
					_this.subject.push({name:res.data.subject[i].name});
					if(res.data.extend.subject_id == res.data.subject[i].id){
						_this.subject2 = res.data.subject[i].name;
						_this.subject_id = res.data.subject[i].id;
					}
				}
				_this.question_num = res.data.extend.question_num;
				_this.gradeinfo = res.data.grade;
				_this.subjectinfo = res.data.subject;
			});
		},
	};
</script>