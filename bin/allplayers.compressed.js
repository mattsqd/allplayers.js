var allplayers=allplayers||{};allplayers.date=function(a,b,c){this.newDate=function(a){return"string"===typeof a?new Date(a):"object"===typeof a?a:new Date};this.start=this.newDate(a);this.end=this.newDate(b);this.repeat=c?{interval:c.interval?c.interval:1,freq:c.freq?c.freq:"DAILY",until:this.newDate(c.until),bymonth:c.bymonth?c.bymonth:[],bymonthday:c.bymonthday?c.bymonthday:[],byday:c.byday?c.byday:[],exdate:c.exdate?c.exdate:[],rdate:c.rdate?c.rdate:[]}:null};
if(!Date.prototype.toISOString){var padzero=function(a){return 10>a?"0"+a:a},pad2zeros=function(a){100>a&&(a="0"+a);10>a&&(a="0"+a);return a};Date.prototype.toISOString=function(){var a=this.getUTCFullYear()+"-",a=a+(padzero(this.getUTCMonth()+1)+"-"),a=a+(padzero(this.getUTCDate())+"T"),a=a+(padzero(this.getUTCHours())+":"),a=a+(padzero(this.getUTCMinutes())+":"),a=a+(padzero(this.getUTCSeconds())+".");return a+=pad2zeros(this.getUTCMilliseconds())+"Z"}}
allplayers.date.prototype.update=function(a,b,c){this.start=a?this.newDate(a):this.start;this.end=b?this.newDate(b):this.end;c&&(c.until=this.newDate(c.until),jQuery.extend(this.repeat,c))};allplayers.date.prototype.addDate=function(a,b){b=this.newDate(b);this.repeat[a].push(b)};allplayers.date.prototype.addException=function(a){this.addDate("except",a)};allplayers.date.prototype.addRDate=function(a){this.addDate("rdate",a)};
allplayers.date.prototype.get=function(){var a=0,b={start:this.start.toISOString(),end:this.end.toISOString()};if(this.repeat){b.repeat={interval:this.repeat.interval,freq:this.repeat.freq,until:this.repeat.until.toISOString(),bymonth:this.repeat.bymonth,bymonthday:this.repeat.bymonthday,byday:this.repeat.byday,exdate:[],rdate:[]};for(a=this.repeat.exdate.length;a--;)b.repeat.exdate.push(this.repeat.exdate[a].toISOString());for(a=this.repeat.rdate.length;a--;)b.repeat.rdate.push(this.repeat.rdate[a].toISOString())}return b};
allplayers=allplayers||{};allplayers.event=function(a,b,c){drupal.node.call(this,a,b,c)};allplayers.event.prototype=new drupal.node;allplayers.event.prototype.constructor=allplayers.event;allplayers.event.api=jQuery.extend(new drupal.api,{resource:"events"});allplayers.event.index=function(a,b,c){drupal.entity.index(allplayers.event,a,b,c)};
allplayers.event.prototype.set=function(a){drupal.node.prototype.set.call(this,a);this.entityName="event";this.api=allplayers.event.api;this.id=a.uuid||a.id||this.id||"";this.setValues({allDay:!1,gids:[],description:"",resources:[],competitors:{},category:"Other"},a);this.date=new allplayers.date(a.start,a.end);this.start=this.date.start;this.end=this.date.end};
allplayers.event.prototype.get=function(){return jQuery.extend(drupal.node.prototype.get.call(this),{allDay:this.allDay,gids:this.gids,description:this.description,resources:this.resources,competitors:this.competitors,category:this.category,date_time:this.date.get()})};allplayers=allplayers||{};allplayers.group=function(a,b,c){drupal.node.call(this,a,b,c)};allplayers.group.prototype=new drupal.node;allplayers.group.prototype.constructor=allplayers.group;
allplayers.group.api=jQuery.extend(new drupal.api,{resource:"groups"});allplayers.group.index=function(a,b,c){drupal.entity.index(allplayers.group,a,b,c)};
allplayers.group.prototype.set=function(a){drupal.node.prototype.set.call(this,a);this.entityName="group";this.api=allplayers.group.api;this.id=a.uuid||a.id||this.id||"";this.has_children=a.hasOwnProperty("has_children")?a.has_children:!!this.has_children;this.location=a.location||this.location||new allplayers.location;this.setValues({activity_level:0,list_in_directory:0,active:!1,registration_fees_enabled:"",approved_for_payment:"",accept_amex:"",primary_color:"",secondary_color:"",node_status:0,
logo:"",url:"",groups_above_uuid:[],registration_link:"",registration_text:""},a)};
allplayers.group.prototype.get=function(){return jQuery.extend(drupal.node.prototype.get.call(this),{location:this.location.get(),activity_level:this.activity_level,list_in_directory:this.list_in_directory,active:this.active,registration_fees_enabled:this.registration_fees_enabled,approved_for_payment:this.approved_for_payment,accept_amex:this.accept_amex,primary_color:this.primary_color,secondary_color:this.secondary_color,node_status:this.node_status,logo:this.logo,uri:this.uri,url:this.url,groups_above_uuid:this.groups_above_uuid,
registration_link:this.registration_link,registration_text:this.registration_text})};allplayers.group.prototype.getEvents=function(a,b){this.api.get(this,"events",a,function(a){for(var d in a)a[d]=new allplayers.event(a[d]);b(a)},!0)};allplayers.group.prototype.getUpcomingEvents=function(a,b){this.api.get(this,"events/upcoming",a,function(a){for(var d in a)a[d]=new allplayers.event(a[d]);b(a)},!0)};allplayers.group.prototype.getGroupTree=function(a,b){this.api.get(this,"subgroups/tree",a,b,!0)};
allplayers=allplayers||{};allplayers.location=function(a,b,c){drupal.entity.call(this,a,b,c)};allplayers.location.prototype=new drupal.entity;allplayers.location.prototype.constructor=allplayers.location;allplayers.location.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.setValues({street:0,city:"",state:"",zip:"",country:"",latitude:"",longitude:""},a)};
allplayers.location.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{street:this.street,city:this.city,state:this.state,zip:this.zip,country:this.country,latitude:this.latitude,longitude:this.longitude})};allplayers=allplayers||{};
(function(a){var b={dialog:"#calendar-dialog-form"};allplayers.calendars={};a.fn.allplayers_calendar||(a.fn.allplayers_calendar=function(c){return a(this).each(function(){allplayers.calendars[a(this).selector]||new allplayers.calendar(a(this),c)})});allplayers.calendar=function(c,d){var e=this,d=a.extend(b,d,{header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},editable:true,dayClick:function(a,c,b,d){console.log(a);console.log(c);console.log(b);console.log(d)},eventClick:function(a,
c,b){console.log(a);console.log(c);console.log(b)},eventDrop:function(a){a.obj.update(a);a.obj.save()},eventResizeStop:function(a){a.obj.update(a);a.obj.save()},events:function(a,c,b){e.getEvents(a,c,b)}});this.dialog=a(d.dialog,c).hide();allplayers.calendars[d.id]=this;this.uuid="";c.fullCalendar(d)};allplayers.calendar.prototype.onEventClick=function(){console.log("Event has been clicked")};allplayers.calendar.prototype.getUUID=function(a){if(this.uuid)a.call(this);else{var b=this;allplayers.api.searchGroups({search:"Spring Soccer 2011"},
function(e){b.uuid=e[0].uuid;a.call(b)})}};allplayers.calendar.prototype.getEvents=function(a,b,e){var f=a.getFullYear()+"-",f=f+(a.getMonth()+1+"-"),f=f+a.getDate(),g=b.getFullYear()+"-",g=g+(b.getMonth()+1+"-"),g=g+b.getDate();this.getUUID(function(){allplayers.api.getGroupEvents(this.uuid,{start:f,end:g,fields:"*",limit:0,offset:0},function(a){for(var b=a.length;b--;){a[b].id=a[b].uuid;a[b].obj=new allplayers.event(a[b])}e(a)})})}})(jQuery);
