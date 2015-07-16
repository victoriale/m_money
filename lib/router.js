
//Home Route
Router.route('/:partner_id?/home',
  function(){

  }, {
    name: 'content.realestate.homepage'
})

//Finance Route
Router.route('/finance',
  function(){
    this.layout('finance_profile');
    this.render('finance_profile');
  }, {
    name: 'login_reset'
  })
