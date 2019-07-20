var count = 0, i = 0;
var countTaskDone = 0, countActive;
var templateFooter = `<span class="todo-count"><strong></strong> items left</span>
<ul class="filters">
    <li>
        <a class="all-task selected" href="#/">All</a>
    </li>
    <li>
        <a class="to-do-task" href="#/active">Active</a>
    </li>
    <li>
        <a class="completed-task" href="#/completed">Completed</a>
    </li>
</ul>
<button class="clear-completed" style="display: none">Clear completed</button>`;
$('.footer').html(templateFooter);
$('.new-todo').keypress(function(e){
    if(e.which === 13){
        var text = $('.new-todo').val();
        if(text !== ''){
            addList(text);
            activedInput();
            clearInput();
            $('.toggle-all').prop('checked', false);
            count ++;
            updateCount();
        }
    }
});
function clearInput(){
    $('.new-todo').val('');
}
function activedInput(){
    $('.main').css('display', 'block');
    $('.footer').css('display', 'block');
}
function hiddenList(){
    $('.main').css('display', 'none');
    $('.footer').css('display', 'none');
}
function updateCount(){
    countActive = count -countTaskDone;
    $('strong').text(`${countActive}`);
    if(count === 0) hiddenList();
}
function addList(text){
    i++; //i dùng để gắn class cho mỗi task, tránh sự kiện thực hiện nhiều lần 
    var template = `<li><input type="checkbox" class="toggle ${i}"></input><label class="todo">${text}</label>
                    <button type="button" class="destroy ${i}Button" ></button></li>`;
    $('.todo-list').append(template);//Thêm task
    $('li .' +`${i}`).change(function(){setCompleted($(this));}); // COMPLETED TASK
    $(`.${i}Button`).click(function(){removeTask($(this));}); // XÓA TASK                 
}
function setCompleted(input){
    if(input.prop('checked')){
        input.parents('li').addClass('completed');
        countTaskDone ++;
    }else if(input.prop('checked')=== false){
        input.parents('li').removeClass('completed');
        countTaskDone --;
    }
    updateCount();
    checkTaskDone();
    checkAllDone();
}
function checkTaskDone(){ // hàm dùng để kiểm tra xem có task đã hoàn thanhf chưa
    if(countTaskDone > 0){
        $('.clear-completed').css('display', 'inline'); //nút clear completed 
    }
}
function checkAllDone(){//neu các task đã completed hết thì '.toggle-all' đã checked
    if(countTaskDone === count){
        $('.toggle-all').prop('checked',true);
    }else  $('.toggle-all').prop('checked',false);
}
function removeTask(input){
    if(input.parents('li').attr('class') === 'completed'){
        countTaskDone --;
    }
    input.parents('li').remove();
    count --;
    updateCount();
    checkTaskDone();
}
//MARK ALL (DẤU MŨI TÊN)
$('.toggle-all').change(allDone); // đánh dấu tất cả task
function allDone(){
    if($('.toggle-all').prop('checked')){
        $('.toggle').prop('checked', true);
        countTaskDone = count;
        $('.todo-list li').addClass('completed');
    }else{
        $('.toggle').prop('checked', false);
        countTaskDone = 0;
        $('.todo-list li').removeClass('completed');
    }
    updateCount();
    checkTaskDone();
    checkAllDone();
}
    $('.all-task').click(function(){ // ALL BUTTON
        //show tất cả các task.
        console.log('all button');
        $('.todo-list li').show();
        $('.to-do-task, .completed-task').removeClass('selected');
        $(this).addClass('selected');
        for(var j=0; j<$('.todo-list li').length; j++){
            $('.todo-list li').eq(j).change(function(){
                setCompleted($(this));
                $('.todo-list li').show();
            });
            $('.toggle-all').change(function(){
                allDone();
                $('.todo-list li').show();
            })
        }
    });
    $('.to-do-task').click(function(){  //ACTIVE BUTTON
        //show các task chưa completed.
        //Task đc check sẽ biến mất.
        console.log('active button');
        $(this).addClass('selected');
        $('.all-task, .completed-task').removeClass('selected');
        $('.todo-list li').not('.completed').show();
        $('.todo-list li').filter('.completed').hide();
        for(var j=0; j<$('.todo-list li').not('.completed').length; j++){
            $('.todo-list li').not('.completed').eq(j).change(function(){
                setCompleted($(this));
                $('.todo-list li').filter('.completed').hide();
            })
        }
        $('.toggle-all').change(function(){
            allDone();
            $('.todo-list li').filter('.completed').hide();
        });
    });
    $('.completed-task').click(function(){  //COMPLETED BUTTON
        console.log('completed button');
        $('.all-task, .to-do-task').removeClass('selected');
        $(this).addClass('selected');
        $('.todo-list li').not('.completed').hide();
        $('.todo-list li').filter('.completed').show();
        for(var j=0; j<$('.todo-list li').filter('.completed').length; j++){
            $('.todo-list li').filter('.completed').eq(j).change(function(){
                setCompleted($(this));
                $('.todo-list li').not('.completed').hide();
                $('.todo-list li').filter('.completed').show();
            })
        }
        $('.toggle-all').change(function(){
            allDone();
            $('.todo-list li').not('.completed').hide();
            $('.todo-list li').filter('.completed').show();
        })
    });
    $('.clear-completed').click(removeCompleted); //CLEAR COMPLETED BUTTON

function removeCompleted(){ //xóa hết các task đã completed 
    count = count - $('.completed').length;
    countTaskDone = 0;
    $('.completed').remove();
    updateCount();
}