// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require select2
//= require bootstrap-dropdown
//= require bootstrap
//= require select2
//= require jobs
//= require custom
var current_job_id;
var current_job_type;
var arr_vendor;
$(document).ready(function(){
  $('.sigPad').signaturePad({drawOnly:true});
  $("#job-type").select2();          
});
var back_value = new Array;
var back_count = 0;
function reload(type)
{
  div = 'body';
  url = '';
  $("#inner").hide('slide');
  $("#loader").show('slide');
  if(type == 'home')
  {
    url = '/';
  }
  else if(type == 'job_list')
  {
    url = '/jobs/view_job';
  }
  else if(type == 'entry')
  {
    $('#canvas').remove();
    url = '/jobs/entry?id='+current_job_id+'&type='+current_job_type;
    current_job_id = '';
  }
  else if(type == 'job')
  {
    url = '/pages/job';
  }
  else if(type == 'download')
  {
    
    url = '/jobs/download_job';
  }
  else if(type == 'draft')
  {
    url = '/jobs/view_draft';
  }
  else if(type == 'login')
  {
    url = '/pages/login';
  }
  else if(type == 'settings')
  {
    url = '/pages/setting'
  }
  else if(type == 'logout')
  {
    clearData();
    url = '/users/sign_in'
  }
  if(url != '')
  {
    back_value[back_count] = window.location.pathname + '' + window.location.search;
    back_count += 1;
    setTimeout(function (){
      $('<div></div>').load(url + " div#" + div, null, 
      function (responseText, textStatus, XMLHttpRequest) {
          temp = $(this).html();
          window.history.pushState("object or string", "Title", url);
          $('#' + div).html(temp);
          $("#loader").hide('slide');
          $('#' + div).show('slow');
          $(window).scrollTop($('#' + div).offset().top);
          if(type == 'entry')
          {
            setSelectValues();
          }
        }
      );
    }, 2000);
  }
}

function updateJobs(type)
{
  var start = new Date().getTime();
  $("#inner").hide('slide');
  $("#loader").show('slide');
  $.ajax({  
    type: "GET",
    url: "/ajax/update_jobs/", 
    //beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: {},
    success: function(result){
      console.log(result);
      //return;
      stop = new Date().getTime() - start;
      setCookies(type,result,stop);
    }, 
    error: function(result) {
    }
  });
}
function  setCookies(type,result,stop)
{
  resetJobs();
  for(var k = 0; k < result.length; k++)
  {
    $.cookie('job' + k, '{"job": "' + result[k]["job"] +
      '","address": "' + result[k]["address"] +
      '","qmnum": "' + result[k]["qmnum"] +
      '","qmart": "' + result[k]["qmart"] +
      '","qmartx": "' + result[k]["qmartx"] +
      '","clientname": "' + result[k]["clientname"] +
      '","clientname2": "' + result[k]["clientname2"] +
      '","soldto": "' + result[k]["soldto"] +
      '","contactname1": "' + result[k]["contactname1"] +
      '","telf1": "' + result[k]["telf1"] +
      '","telf2": "' + result[k]["telf2"] +
      '","contact_email1": "' + result[k]["contact_email1"] +
      '","zz_melways": "' + result[k]["zz_melways"] +
      '","supr_email": "' + result[k]["supr_email"] +
      '","coord_email": "' + result[k]["coord_email"] + '"}', { expires: 7, path: '/' });
  }
  $.cookie('job_count', result.length, { expires: 7, path: '/' });
  $.cookie('job_timer', ((stop % 360000) % 60000) / 1000, { expires: 7, path: '/' });
  reload(type);
}
function setVendorCookie()
{
  $("#inner").hide('slide');
  $("#loader").show('slide');
  $.ajax({  
    type: "GET",
    url: "/ajax/update_vendors/", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: {},
    success: function(result){
      for(var k = 0; k < result.length; k++)
      {
        $.cookie('vendor'+k,'{"bname": "'+ result[k]["bname"] + 
          '","fullname": "' + result[k]["fullname"] +
          '","email": "' + result[k]["e_mail"] + '"}' , { expires: 7, path: '/' });
        /*$.cookie('vendor'+k,'{"bname": "'+ result[k]["BNAME"] + 
          '","fullname": "' + result[k]["FULLNAME"] +
          '","email": "' + result[k]["E_MAIL"] + '"}' , { expires: 7, path: '/' });*/
      }
      $.cookie('vendor_count', result.length, { expires: 7, path: '/' });
      if(current_job_id.length != 0)
      {
        reload('entry');
      }
      else
      {
        $("#inner").show('slide');
        $("#loader").hide('slide');
      }
      // 
    }, 
    error: function(result) {
    }
  });
}
function resetJobs(){
  for(var k =0 ;k < $.cookie('job_count'); k++)
  {
    $.removeCookie('job'+k);
  }
  $.removeCookie('in_goal');
  $.removeCookie('job_count');
  $.removeCookie('job_timer');
}

function openCanvas()
{
  $(".canvas").bPopup({
    easing: 'easeOutBack',
    speed: 100
  });
}
function clearData()
{
  for(var k =0;k < $.cookie('job_count'); k++)
  {
    $.removeCookie('job'+k, { expires: 7, path: '/' });
  }
  for(var k =0;k< $.cookie('vendor_count'); k++)
  {
    $.removeCookie('vendor'+k, { expires: 7, path: '/' });
  }
  $.removeCookie('vendor_count',{ expires: 7, path: '/' });
  $.removeCookie('in_goal',{ expires: 7, path: '/' });
  $.removeCookie('job_count',{ expires: 7, path: '/' });
  $.removeCookie('job_timer',{ expires: 7, path: '/' });
}
function setSelectValues()
{
  ctr = $('#ctr_value').attr("value");
  for(var k = 1; k < ctr; k++)
  {
    $("#location_" + k).select2();
    $("#detail_"+k).select2();
    $("#cause-code_"+k).select2();
    $("#vendor_"+k).select2();
  }
  if($('#arr_vendors').attr("value") != undefined)
  {
    arr_vendor=$('#arr_vendors').attr("value");
    arr_vendor=arr_vendor.substring(1, arr_vendor.length - 1);
    arr_vendor=JSON.parse("[" + arr_vendor + "]");
  }
  $('#canvas').append('<div id="canvas"></div>');
  $('.sigPad').signaturePad({drawOnly:true});
  $("#job-type").select2();
}
function setFaults(temp){
  ctr = $('#ctr_value').attr("value");
  for(var k = temp; k < ctr - 1; k++)
  {
    if($('#fault_id_' + (k+1)).attr("value") != undefined)
    {
      $('#fault_id_' + k).attr("value", $('#fault_id_' + (k+1)).attr("value"));
    }
    else
    {
      $('#fault_id_' + k).attr("value","");
    }
    $('#s2id_detail_' + k).html($('#s2id_detail_' + (k + 1)).html());
    $('#s2id_location_' + k).html($('#s2id_location_' + (k + 1)).html());
    $('#comment_' + k).val($('#comment_' + (k + 1)).val());
    $('#s2id_cause-code_' + k).html($('#s2id_cause-code_' + (k + 1)).html());
    $('#reason_' + k).val($('#reason_' + (k + 1)).val());
    $('#s2id_vendor_' + k).html($('#s2id_vendor_' + (k + 1)).html());
    $('#image_' + k).html($('#image_' + (k + 1)).html());
    var src;
    if($('#fault_image_' + (k + 1)).attr('src') != undefined)
    {
      src = $('#fault_image_' + (k + 1)).attr('src');
    }
    else
    {
      src = '';
    }
    $('#fault_image_' + k).attr('src',src);
    image_array[k] = image_array[k+1];
    $('#type_image_'+(k) + '.image').val('');
  }
  $('.' + (ctr - 1)).remove();
  $('#fault_id_' + (ctr - 1) ).attr("value",'');
  image_array[ctr - 1] = '';
  if(ctr > 1)
  {
    ctr = ctr - 1;
  }
}
