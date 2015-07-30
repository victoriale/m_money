
//Home Route
Router.route('/:partner_id?/home',
  function(){

  }, {
    name: 'content.realestate.homepage'
})
//finace_profile
Router.route('/finance',
function(){
  this.layout('finance_layout');
  this.render('finance_profile',{to:"centerarea"});
},{
  name:'login_resetf'
})

//company_profile
Router.route('/company',
function(){
  this.layout('finance_layout');
  this.render('company_profile',{to:"centerarea"});
},{
  //name:'login_resetc'
})

//location_profile
Router.route('/location',
function(){
  this.layout('finance_layout');
  this.render('location_profile',{to:"centerarea"});
},{
  //name:'login_resetc'
})

//exective_profile
Router.route('/executive',
function(){
  this.layout('finance_layout');
  this.render('executive_profile',{to:"centerarea"});
},{
  //name:'login_resetx'
})
