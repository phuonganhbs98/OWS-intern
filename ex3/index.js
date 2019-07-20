
var wrongIcon = "<i class='fas fa-times' style='color: #c33'></i>";
var alert = '<p style = \'color: #c33\'>' + wrongIcon + ' ';
var suggest = '<p style = \'color: #808080\'>';
$(document).ready(function(){
    $('.form-control').on({focus: onFocus, input: checkInput});
    $('form').on({submit: checkValidate, reset: reset});
    $('input.interest-input').change(checkInterest); 
    $('#accept').change(checkAccept);
});

function onFocus(){
    var id = $(this).attr('id');
    if(id === 'username') $('#username-comment').html(suggest + "You can use letters, numbers and periods." + '</p>');
    else if(id === 'pass') $('#password-comment').html(suggest + "Please fill in at least eight characters" + '</p>');
}
function checkInput(){
    onInput($(this));
}
function onInput(input){
    var cmt, label;
    var id = input.attr('id');
    if(id === 'username'){ cmt = '#username-comment'; label = '#user-label';}
    else if(id === 'pass') {cmt = '#password-comment'; label = '#pass-label';}
    else if(id === 'verify-pass') {cmt = '#verify-comment'; label = '#verify-pass-label';}
    else if(id === 'gender') {cmt = '#gender-comment'; label = '#gender-label';}
    else if(id === 'email1') {cmt = '#email-comment'; label = '#email-label';}
    else if(id === 'note') {cmt = '#note-comment'; label = '#note-label';}
    if(input.val() === ''){
        $(`${cmt}`).html(alert + 'This field is required' + '</p>');
        changeColor(input, $(`${label}`), false);
        return 0;
    }else {
        if(id === 'username'){
            if(input.val().length < 3 || input.val().length > 12){
                $(`${cmt}`).html(alert + 'Please enter 3-12 digits, letters, underscores' + '</p>');
                changeColor(input, $(`${label}`), false);
                return 0;
            } 
        }else if(id === 'pass'){
            if(input.val().length < 8 || input.val().length > 16){
                $(`${cmt}`).html(alert + 'Please enter a value between 8 and 16 characters long.' + '</p>');
                changeColor(input, $(`${label}`), false);
                return 0;
            }
        }else if(id ==='verify-pass'){
            if(input.val() !== $('#pass').val()){
                $(`${cmt}`).html(alert + 'Verify Password must be equal to Password.' + '</p>');
                changeColor(input, $(`${label}`), false);
                return 0;
            }
        }else if(id === 'gender'){
            if(input.val() === 'select...'){
                $(`${cmt}`).html(alert + 'This field is required' + '</p>');
                changeColor(input, $(`${label}`), false);
                return 0;
            }
        }else if(id === 'email1'){
            if(input.val().indexOf('@') === -1 || input.val().lastIndexOf('@') !==input.val().indexOf('@')
            || input.val().indexOf('.') === -1 || input.val().lastIndexOf('.') === input.val().length-1
            ||input.val().lastIndexOf('.') <= input.val().indexOf('@')+ 1){
                $(`${cmt}`).html(alert + 'Please enter a valid email address.' + '</p>');
                changeColor(input, $(`${label}`), false);
                return 0;
            }
        } 
        $(`${cmt}`).html('');
        changeColor(input, $(`${label}`), true);
        return 1;
    }
}
function checkInterest(){
    if($('#sports').prop('checked') === true || $('#movie').prop('checked') === true ||$('#game').prop('checked') === true){
        $('#interest-comment').html('');
        $('.interest').removeClass('label-false');
        $('.interest').addClass('label-true');
        return 1;
    }else {
        $('#interest-comment').html(alert + 'This field is required' + '</p>');
        $('.interest').addClass('label-false');
        return 0;
    }
}
function checkAccept(){
    if($('#accept').prop('checked')=== true){
        $('#accept-comment').html('');
        $('#accept-label').removeClass('label-false');
        $('#accept-label').addClass('label-true');
        return 1;
    }else{
        $('#accept-comment').html(alert + 'This field is required' + '</p>');
        $('#accept-label').addClass('label-false'); return 0;
    }
}
function changeColor(input, label, trueOrFalse){
    if(trueOrFalse === false){
        input.addClass('false');
        label.addClass('label-false');
    }else{
        input.removeClass('false');
        input.addClass('true');
        label.removeClass('label-false');
        label.addClass('label-true');
    }
}

function checkValidate(){
    var id;
    for(var i =0; i< $('.form-control').length; i++){
        if(i === 0) id = '#username';
        else if(i=== 1) id = '#pass';
        else if(i=== 2) id = '#verify-pass';
        else if(i=== 3) id = '#gender';
        else if(i=== 4) id = '#email1';
        else if(i=== 5) id = '#note';
        $('.form-control')[i].focus();
        if(onInput($(id))===0) return false;
    }
    if(checkInterest()===0) return false;
    else if(checkAccept()===0) return false;
    else return true;
}
function reset(){
    $('label').removeClass('label-true');
    $('label').removeClass('label-false');
    $('label').addClass('label-reset');
    $('.form-control').removeClass('true');
    $('.form-control').removeClass('false');
    $('.form-control').addClass('input-reset');
    $('.cmt, .cmt-checkbox').html('');
}