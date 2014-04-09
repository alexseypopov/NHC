var ctr;
$(document).ready(function(){
  $("#sign_in_user").submit(function() { 

    $("#inner").hide('slide');
    $("#loader").show('slide');
    var u = $.trim(document.getElementById("user_username").value);
    //var p = $.trim(document.getElementById("user_password").value);
    $(window).scrollTop($('#body').offset().top);

    $.cookie('username', u, { expires: 7, path: '/' });
    $.cookie('security_token', token(), { expires: 7, path: '/' });

    reload('home');
    /*$.ajax({        
      type: "POST", 
      url:"../../users/sign_in", 
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: {username: u, password: p},
      error:function(){
        alert('error')
        $("#inner").show('slide');
        $("#loader").hide('slide');
      },
      success: function(data) {

        if(data == true){

          reload('home');
          
        }
        else{
          alert("Invalid Email/Password");
          $("#inner").show('slide');
          $("#loader").hide('slide');
        }
      }
    });*/
    return false; 
  });
  setSelectValues();
});
arr_location=["Other", "Alfresco","Balcony","Bathroom", "Bathroom 2","Bedroom 2","Bedroom 2 Robe","Bedroom 2 WIR","Bedroom 3","Bedroom 3 Robe", "Bedroom 3 WIR","Bedroom 4", "Bedroom 4 Robe", "Bedroom 4 WIR", "Bedroom 5", "Bedroom 5 Robe", "Bedroom 5 WIR", "Bedroom 6", "Bedroom 6 Robe", "Bedroom 6 WIR","Broom", "Cloak", "Computer Hallway", "Computer Room","Courtyard", "Dining", "Driveway", "Ensuite 2", "Ensuite 3", "Ensuite 4", "Ensuite 5", "Entry", "Family", "Family Hallway", "Foyer", "Front Hallway", "Gallery", "Games", "Games Hallway", "Guest Suite", "Home Theatre", "Home Theatre Hallway", "Kids Play Study", "Kitchen", "Laundry", "Laundry Hallway", "Linen", "Lounge", "Lounge Hallway", "Master Bedroom", "Master Ensuite", "Master Ensuite WC", "Master WIR", "Meals","Mudroom", "Office", "Pantry", "Patio", "Powder", "Rear Hallway", "Roof", "Rumpus", "Second Rear Hallway", "Sitting", "Stairs", "Store", "Study", "Study Hallway", "Study Nook", "Terrace", "Veranda", "Walk In Linen", "Walk In Pantry", "WC"];
arr_detail=["Other", "Adjust door to", "Adjust hinges to door at", "Adjust latch to door at", "Fill hole around HWS penetration", "Gap and touch up cornice to", "Gap and touch ip skirting to", "Gap and touch up architrave to", "Install door seal to", "Re seal shower to", "Re seal join to", "Re seal internal corner to", "Re trowel, sand and paint ceiling to", "Re trowel, sand and paint wall to", "Re trowel, sand and paint internal corner to", "Remove and replace", "Repair and paint plaster crack to", "Repair and paint cornice to", "Stain (or paint) top and bottom of door to"];
arr_code=["CD Contract Dispute","EL Electrical","GM Ground Movement","IC Incomplete Construction","MD Managers Decision","MF Material Failure","MG Maintenance (General)","PLA Plaster","PLU Plumbing","PW Poor Workmanship","RL Roof Leak","SL Shower Leak","SW Supplier Warranty"];


function addColumns(create, temp){
  ctr = parseInt($('#ctr_value').attr("value"));
  if(create)
  {
    var str = 
          '<tr class="'+ctr+'" bgcolor="white" style="border-top: 2px solid black;">' +
          '<td><label><label>Remove Fault</label></label></td>' +
          '<td class="pull-left"><button class="btn" id="_'+ctr+'" "name="'+ctr+'" class="" onclick="addColumns(false,'+ctr+'); return false;" style="margin-bottom: 2px; height: 36px; width: 36px; margin-top: 2px; font-weight: 700;border: 1px solid;float:left;" >-</button></td>' +
        '</tr>' +
        '<tr class="'+ctr+'">' +
          '<td><label>Detail*</label></td>' +
          
          '<td class="pull-left">'+
          '<select id="detail_'+ctr+'" style="margin-bottom: 2px; margin-top: 2px;"">';
            for (var i=0;i<arr_detail.length;i++)
              {
                 var y = y + "<option>"+arr_detail[i]+"</option>";

              }
              str = str + y;

    str= str +  '</td>' +
        '</tr>' +
      
        '<tr class="'+ctr+'" bgcolor="white">' +
          '<td><label>Location*</label></td>' +
          '<td class="pull-left">' +
            '<select id="location_'+ctr+'" style="margin-bottom: 2px; margin-top: 2px;"">';
              for (var i=0;i<arr_location.length;i++)
              {
                 var x = x + "<option>"+arr_location[i]+"</option>";

              }
              str = str + x;
              
    str= str +  '</select>' +

          '</td>' +
        '</tr>' +
        '<tr class="'+ctr+'">' +
          '<td><label>Comment</label></td>' +
          '<td class="pull-left"><textarea id="comment_'+ctr+'" style="margin-bottom: 2px; height: 70px; margin-top: 2px; resize:none;" ></textarea></td>' +
        '</tr>' +
        
        '<tr class="'+ctr+'" bgcolor="white">' +
          '<td><label>Cause Code*</label></td>' +
          '<td class="pull-left">'+

          '<select id="cause-code_'+ctr+'" style="margin-bottom: 2px; margin-top: 2px;"">';
              for (var i=0;i<arr_code.length;i++)
              {
                 var z = z + "<option>"+arr_code[i]+"</option>";

              }
              str = str + z;
              
    str= str +  '</select>' +


          '</td>' +
        '</tr>' +
        '<tr class="'+ctr+'">' +
          '<td><label>Reason*</label></td>' +
          '<td class="pull-left"><input type="text" id="reason_'+ctr+'" style="margin-bottom: 2px; margin-top: 2px; background-color: #FFB8B8;" /></td>' +
        '</tr>' +
        '<tr class="'+ctr+'" bgcolor="white">' +
          '<td><label>Vendor*</label></td>' +
          '<td class="pull-left">' +
          '<select id="vendor_'+ctr+'" style="margin-bottom: 2px; margin-top: 2px;"">';
              if(arr_vendor != undefined)
              {
                for (var i=0;i<arr_vendor.length;i++)
                {
                   var u = u + "<option>"+arr_vendor[i]+"</option>";

                }
                str = str + u;
              }
              
    str= str +  '</select>' +
        '</tr>' +
        '<tr class="'+ctr+'">' +
          '<td><label>Photo</label></td>' +
          '<td class="pull-left"><input class="image" id="type_image_'+ctr+'" type="file" style="width: 200px;"/></td>' +
          
          
        '</tr>' +
        '<tr class="'+ctr+'" style="border-bottom: 2px solid black;">' +
          '<td></td><td><button class="btn pull-left" style="margin-bottom: 20px; margin-right: 10px; width: 30px; height: 20px;" onclick=" removeImage(' + ctr + ');return false;">-</button><p class="pull-left">Remove File</p></td>' +
        '</tr>';

    $("#fault").append(str);
    
  $("#location_" + ctr).select2();
  $("#detail_"+ctr).select2();
  $("#cause-code_"+ctr).select2();
  $("#vendor_"+ctr).select2();
    create = false;
    ctr = ctr + 1;
  }
  else
  {
    setFaults(temp);
    create = true;
  }
  $('#ctr_value').attr("value", ctr);
}
function goBack()
{
  if(back_count > 0)
  {
    $("#inner").hide('slide');
    $("#loader").show('slide');
    setTimeout(function (){
      $('<div></div>').load(back_value[back_count - 1] + " div#inner", null, 
      function (responseText, textStatus, XMLHttpRequest) {
          temp = $(this).html();
          window.history.pushState("object or string", "Title", back_value[back_count - 1]);
          $('#inner').html(temp);
          if($("#job-type").html != undefined)
          {
            setSelectValues();
          }
          $("#loader").hide('slide');
          $('#inner').show('slow');
          back_count -= 1;
        }
      );
    }, 2000);
  }
}

function signatureSave() {
  // $("saveSignature").show();
  var canvas = document.getElementById("theSignature");// save canvas image as data url (png format by default)
  var dataURL = canvas.toDataURL("image/png");
  document.getElementById("saveSignature").src = dataURL;
  $('#image').attr("value", dataURL);
  $('#job_signature_temp').attr("value", dataURL);
  $("#saveSignature").show();
  $("#canvas").bPopup().close();
};
function saveSignatureClear() {
  $("#saveSignature").hide();
  $("#saveSignature").attr("src", "");
}
// function getCredentials()
// {

// 	var u = document.getElementById("username").value;
// 	var p = document.getElementById("password").value;

// 	url = "http://shop-feed-88.herokuapp.com/login?username="+u+"&password="+p;
// 	var win=window.open(url, '_blank');
// 	win.focus();

// }

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};


