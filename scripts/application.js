var documentCounter = Number(localStorage.getItem('doc-counter'));

if(documentCounter == 0){
  documentCounter++;
}

$(document).ready(function() {
  dataInit();
});

function dataInit(){
  var startText = localStorage['files.file1.text'];
  var startTitle = localStorage['files.file1.title'];
  
  for(i=1;i<=documentCounter;i++) {
    var docTitle = localStorage['files.file' + i + '.title'];
    var newDoc = '<li id="file'+ i +'"><div class="hidden metadata"><span class="fileNum" id="fileNum'+ i +'">'+i+'</span></div><span class="title">'+ docTitle +'</span><a class="trash">delete</a></li>';
    $('#files ul').append(newDoc);
  }
  $('#fileNum1').trigger('click');
  $('#workspace input').trigger('keyup');                    
}


$('#workspace textarea').keyup(function() {
  var activeText = $(this).val();
  var activeFileNum = $('.activeDoc .metadata .fileNum').text();
  
  localStorage['files.file'+activeFileNum+'.text'] = activeText;
});

function loadFile(fileNumber){
  var savedText = localStorage['files.file'+fileNumber+'.text'];
  var savedTitle = localStorage['files.file'+fileNumber+'.title'];
  
  $('#workspace textarea').val(savedText);
  $('#title').val(savedTitle);
}

function countDocuments(){
  var numberofDocs = $('#files li').length;
  documentCounter = numberofDocs;
  localStorage['doc-counter'] = numberofDocs;  
}

function updateDocNumbers(){
  //TODO click into each field to force them to update - this should help prevent some 
  //bugginess with the redraws (i.e. delete file 1, but 2 & 3 are still there)


//loop through each title click

}

$('#workspace input').keyup(function() {
  var activeTitle = $(this).val();
  var activeFileNum = $('.activeDoc .metadata .fileNum').text();
  
  localStorage['files.file' + activeFileNum +'.title'] = activeTitle;

  if($(this).val().length >= 1){
    $('.activeDoc .title').text(activeTitle);  
  }
  else{
    $('.activeDoc .title').text('Untitled Document');
  }
  
  var titleData1 = localStorage.getItem("title1");
});

$('#newFile').click(function() {
  var docNumber = $('#files li').length + 1;
  var newDoc = '<li id="file'+ docNumber +'"><div class="hidden metadata"><span class="fileNum" id="fileNum'+ docNumber +'">'+docNumber+'</span></div><span class="title">Untitled Document</span><a class="trash">delete</a></li>';
  
  localStorage['files.file'+docNumber+'.title'] = 'Untitled Document';
  localStorage['files.file'+docNumber+'.text'] = ' ';
  
  $('#files ul').append(newDoc);
  countDocuments();
});

$('.trash').live('click', function() {
  var activeFileNum = $(this).siblings('.metadata').children('.fileNum').text();
  localStorage.removeItem('files.file'+activeFileNum+'.title');
  localStorage.removeItem('files.file'+activeFileNum+'.text');
  $(this).parent().remove();
  var numberofDocs = $('#files li').length;
  documentCounter = numberofDocs;
  localStorage['doc-counter'] = numberofDocs;
  
  updateDocNumbers();
});

$('#deleteAll').click(function() {
  //delete localStorage[];
  $('#workspace textarea').val('');
  $('#workspace input').val('');
  $('#files ul').html('');
  $('#files ul').append('<li id="file1" class="activeDoc"><div class="hidden metadata"><span id="fileNum1" class="fileNum">1</span></div><span class="title">Untitled Document</span><a class="trash">delete</a></li>');
  
  localStorage.clear()
});

$('#files li').live('click', function() {
  
  $('#files li').removeClass('activeDoc');
  $(this).addClass('activeDoc');
  var fileNumber = $(this).children('.metadata').children('.fileNum').text();
  loadFile(fileNumber);
});