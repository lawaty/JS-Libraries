manager.import(["forms/basicForm.js", "forms/editableForm.js", "forms/listForm.js"])

class Form {
  static new(form){
    let type = $(form).attr('form_type')
    switch(type){
      case 'basic':
        return new BasicForm(form)
      case 'editable':
        return new EditableForm(form)
      case 'list':
        return new ListForm(form)
      default: 
        throw "Form Creation Error: Unknown form type.\nAvailable types are basic, editable, and list"
    }
  }
}

function initializeForms(){
  let forms = []
	$("form[form_type]").each(function(i, form){
    if($(form)[0].hasAttribute('prepare')){
      let prepare = window[$(form).attr('prepare')];
      if(typeof prepare == 'function')
        prepare()
      else console.log('Prepare Function Specified but Not Defined')
    }
		forms[$(form).attr('id')] = Form.new(form)
	});
  return forms
}