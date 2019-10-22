YUI.add("moodle-qtype_musictheory-musictheoryqtype",function(e,t){M.qtype_musictheory=M.qtype_musictheory||{},M.qtype_musictheory.musictheoryqtype={};var n=M.qtype_musictheory.musictheoryqtype;n.questionRender={},n.initQuestionRender=function(e){var t=e.inputname,r=e.optionsxml,i=e.readonly,s=e.initialinput,o=e.correctresponse,u=e.correctrespstr,a=e.additionalparams,f=n.questionRender.convertOptionsXMLtoObjectLiteral(r,a);n.questionRender.renderQuestion(t,f,i,s),o!==null&&typeof o!="undefined"&&o!==""&&n.questionRender.renderCorrectResponse(t,f,o,u)},n.questionRender.renderQuestion=function(t,r,i,s){var o,u,a,f,l,c,h,p;t=t.replace(":","\\:"),o=e.one("#"+t),l=e.one("#musictheory_div_replacedbycanvas_"+t),l&&l.hide(),u=e.one("#musictheory_div_canvas_"+t);if(!u)return;a="musictheory_renderMusicCanvas_"+t.replace("\\:","-"),c=e.one("#"+a),c||(c=e.Node.create('<div style="margin-top:10px;margin-bottom:15px;overflow:auto"><canvas id="'+a+'" width="1" height="1" /></div>'),u.append(c)),r.editable=!i,r.containsUserInput=!0,f=new n.XMLConverter(r),p=function(e){o.set("value",f.getCanvasTextOutput(e))},h=f.getCanvasXML(s),r.musicQType==="keyboard-input"?new KeyboardInput(a,h,p):new MusThGUI(a,h,p),u.show()},n.questionRender.renderCorrectResponse=function(t,r,i,s){var o,u,a,f,l,c;t=t.replace(":","\\:"),o=e.one("#musictheory_correctanswerdiv_"+t);if(!o)return;u="musictheory_renderCorrectResponseCanvas_"+t.replace("\\:","-"),a=e.one("#"+u),a||o.setHTML("<p>"+s+"</p>"+'<canvas id="'+u+'" width="1" height="1" />'),r.editable=!1,r.containsUserInput=!1,f=new n.XMLConverter(r),c=function(){},l=f.getCanvasXML(i),r.musicQType==="keyboard-input"?new KeyboardInput(u,l,c):new MusThGUI(u,l,c)},n.questionRender.convertOptionsXMLtoObjectLiteral=function(t,n){var r=e.XML.parse(t),i={},s=r.getElementsByTagName("options")[0].firstChild,o=s.nodeName;i.musicQType=o;switch(o){case"note-write":case"note-identify":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.includeAlterations=s.getElementsByTagName("includealterations")[0].firstChild.nodeValue,i.includeAlterations=i.includeAlterations==="true";break;case"keyboard-input":i.includestaticnote=s.getElementsByTagName("includestaticnote")[0].firstChild.nodeValue,i.includestaticnote==="true"&&(i.staticnotepitchclass=n.pitchclass,i.staticnoteregister=n.register);break;case"keysignature-write":case"keysignature-identify":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.key=s.getElementsByTagName("key")[0].firstChild.nodeValue;break;case"interval-write":case"interval-identify":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.givenNote=[],i.givenNote.ltr=s.getElementsByTagName("letter")[0].firstChild.nodeValue,i.givenNote.acc=s.getElementsByTagName("accidental")[0].firstChild.nodeValue,i.givenNote.reg=s.getElementsByTagName("register")[0].firstChild.nodeValue;break;case"scale-write":case"scale-identify":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.givenNote=[],i.givenNote.ltr=s.getElementsByTagName("letter")[0].firstChild.nodeValue,i.givenNote.acc=s.getElementsByTagName("accidental")[0].firstChild.nodeValue,i.givenNote.reg=s.getElementsByTagName("register")[0].firstChild.nodeValue,i.includeKS=s.getElementsByTagName("displaykeysignature")[0].firstChild.nodeValue,i.includeKS=i.includeKS==="true",i.scaleType=s.getElementsByTagName("scaletype")[0].firstChild.nodeValue;break;case"chordquality-write":case"chordquality-identify":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.maxNotes=n.maxnotes;break;case"harmonicfunction-write":i.maxNotes=n.maxnotes,i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.key=s.getElementsByTagName("key")[0].firstChild.nodeValue,i.includeKS=s.getElementsByTagName("displaykeysignature")[0].firstChild.nodeValue,i.includeKS=i.includeKS==="true";break;case"harmonicfunction-identify":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.key=s.getElementsByTagName("key")[0].firstChild.nodeValue,i.includeKS=s.getElementsByTagName("displaykeysignature")[0].firstChild.nodeValue,i.includeKS=i.includeKS==="true";break;case"melodic-dictation":i.clef=s.getElementsByTagName("clef")[0].firstChild.nodeValue,i.numberofnotes=s.getElementsByTagName("numberofnotes")[0].firstChild.nodeValue,i.givenNote=[];for(var u=0;u<i.numberofnotes;u++){var a={};a.ltr=s.getElementsByTagName("letter")[0].firstChild.nodeValue,a.acc=s.getElementsByTagName("accidental")[0].firstChild.nodeValue,a.reg=s.getElementsByTagName("register")[0].firstChild.nodeValue,i.givenNote.push(a)}i.includeKS=!1,i.showFirstNote=s.getElementsByTagName("showfirstnote")[0].firstChild.nodeValue,i.showFirstNote=i.showFirstNote==="true"}return i},n.editForm={},n.initEditForm=function(){n.editForm.setOptionVisibility(),n.editForm.setFormOptionListeners()},n.editForm.setFormOptionListeners=function(){e.all("#id_musictheory_musicqtype").on("change",function(){var t=e.one("#id_musictheory_updatemusicqtype");t&&t.simulate("click")}),e.all("#id_musictheory_numberofnotes").on("change",function(){var t=e.one("#id_updatebutton");t&&t.simulate("click")});var t=e.one("#id_musictheory_numberofnotes").get("value");t>1&&location.href.indexOf("musictheory_numberofnotes")==-1&&!e.one("#fgroup_id_musictheory_givennote1elementgroup")&&(location.href.indexOf("?")>-1?location.href=location.href+"&musictheory_numberofnotes="+t:location.href=location.href+"?musictheory_numberofnotes="+t)},n.editForm.setOptionVisibility=function(){var t=e.one("#id_musictheory_updatemusicqtype");t&&t.hide()},n.getKeySign=function(e,t){var n=e.substring(0,e.length-1),r=e.substr(e.length-1,1),i=new Array("F#5","C#5","G#5","D#5","A#4","E#5","B#4"),s=new Array("F#3","C#3","G#3","D#3","A#2","E#3","B#2"),o=new Array("F#4","C#4","G#4","D#4","A#3","E#4","B#3"),u=new Array("F#3","C#4","G#3","D#4","A#3","E#4","B#3"),a=new Array("Bb4","Eb5","Ab4","Db5","Gb4","Cb5","Fb4"),f=new Array("Bb2","Eb3","Ab2","Db3","Gb2","Cb3","Fb2"),l=new Array("Bb3","Eb4","Ab3","Db4","Gb3","Cb4"
,"Fb3"),c=new Array("Bb3","Eb4","Ab3","Db4","Gb3","Cb4","Fb3"),h=[],p=[],d=[],v=[],m,g;return h.Cn="sharp",h.Gn="sharp",h.Dn="sharp",h.An="sharp",h.En="sharp",h.Bn="sharp",h["F#"]="sharp",h["C#"]="sharp",h.Fn="flat",h.Bb="flat",h.Eb="flat",h.Ab="flat",h.Db="flat",h.Gb="flat",h.Cb="flat",p.treblesharp=i,p.basssharp=s,p.altosharp=o,p.tenorsharp=u,p.trebleflat=a,p.bassflat=f,p.altoflat=l,p.tenorflat=c,d.Cn=0,d.Gn=1,d.Dn=2,d.An=3,d.En=4,d.Bn=5,d["F#"]=6,d["C#"]=7,d.Fn=1,d.Bb=2,d.Eb=3,d.Ab=4,d.Db=5,d.Gb=6,d.Cb=7,v.An="Cn",v.En="Gn",v.Bn="Dn",v["F#"]="An",v["C#"]="En",v["G#"]="Bn",v["D#"]="F#",v["A#"]="C#",v.Dn="Fn",v.Gn="Bb",v.Cn="Eb",v.Fn="Ab",v.Bb="Db",v.Eb="Gb",v.Ab="Cb",m=r==="M"?n:v[n],g=p[t+h[m]],g=g.slice(0,d[m]),g},n.XMLConverter=function(e){this.options=e,this.setNotesEditable=e.containsUserInput?!0:!1},n.XMLConverter.prototype.getCanvasXML=function(e){switch(this.options.musicQType){case"note-write":return this.getNoteWriteXML(e);case"note-identify":return this.getNoteIdentifyXML(e);case"keyboard-input":return this.getKeyboardInputXML(e);case"keysignature-write":return this.getKSWriteXML(e);case"keysignature-identify":return this.getKSIdentifyXML(e);case"interval-write":return this.getIntervalWriteXML(e);case"interval-identify":return this.getIntervalIdentifyXML(e);case"scale-write":return this.getScaleWriteXML(e);case"scale-identify":return this.getScaleIdentifyXML(e);case"chordquality-write":return this.getChordQualityWriteXML(e);case"harmonicfunction-write":return this.getHarmonicFunctionWriteXML(e);case"harmonicfunction-identify":case"chordquality-identify":return this.getHarmonicFunctionIdentifyXML(e);case"melodic-dictation":return this.getMelodicDictationXML(e);default:return null}},n.XMLConverter.prototype.getCanvasTextOutput=function(e){switch(this.options.musicQType){case"note-write":return this.getNoteWriteTextOutput(e);case"keyboard-input":return this.getKeyboardInputTextOutput(e);case"keysignature-write":return this.getKSWriteTextOutput(e);case"interval-write":return this.getIntervalWriteTextOutput(e);case"scale-write":return this.getScaleWriteTextOutput(e);case"chordquality-write":case"harmonicfunction-write":return this.getHarmonicfunctionWriteTextOutput(e);default:return""}return""},n.XMLConverter.prototype.getNoteWriteTextOutput=function(t){var n,r,i,s,o,u,a;n=e.XML.parse(t),i="",o=n.getElementsByTagName("Staff");for(a=0;a<o.length;a++){s=o[a].getElementsByTagName("Note");for(u=0;u<s.length;u++)s[u].getAttribute("editable")==="true"&&(r=s[u].getAttribute("accidental"),i+=s[u].getAttribute("letter")+r+s[u].getAttribute("register")+"-"+o[a].getAttribute("clef")+",")}return i.length>0?i=i.substr(0,i.length-1):i="",i},n.XMLConverter.prototype.getNoteWriteXML=function(e){var t,n,r,i=[],s=[],o;t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n';if(this.options.clef!=="grandstaff")t+='<StaffSystem maxLedgerLines="4">\n',t+='<Staff clef="'+this.options.clef+'">\n',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="1" >',e!==""&&e!==null&&typeof e!="undefined"&&(n=this.noteNameToParts(e),t+='<Note letter="'+n.ltr+'" ',t+='register="'+n.reg+'" ',t+='accidental="'+n.acc+'" ',t+='noteValue="whole" editable="'+this.setNotesEditable+'" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>\n",t+="</StaffSystem>\n";else{if(e!==""&&e!==null&&typeof e!="undefined"){r=e.split(",");for(o=0;o<r.length;o++)n=this.noteNameToParts(r[o]),n.clef==="treble"?i.push(n):n.clef==="bass"?s.push(n):parseInt(n.reg,10)>=4?i.push(n):s.push(n)}t+='<StaffSystem maxLedgerLines="4">\n',t+='<Staff clef="treble">\n',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="1" >',i.length>0&&(t+='<Note letter="'+i[0].ltr+'" ',t+='register="'+i[0].reg+'" ',t+='accidental="'+i[0].acc+'" ',t+='noteValue="whole" editable="'+this.setNotesEditable+'" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>\n",t+='<Staff clef="bass">\n',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="1" >',s.length>0&&(t+='<Note letter="'+s[0].ltr+'" ',t+='register="'+s[0].reg+'" ',t+='accidental="'+s[0].acc+'" ',t+='noteValue="whole" editable="'+this.setNotesEditable+'" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>\n",t+="</StaffSystem>\n"}return this.options.includeAlterations&&(t+="    <Toolbars>\n",t+="        <AccidentalToolbar>\n",t+='            <Button symbol="n"/>',t+='            <Button symbol="#"/>',t+='            <Button symbol="b"/>',t+='            <Button symbol="x"/>',t+='            <Button symbol="bb"/>',t+="        </AccidentalToolbar>\n",t+="    </Toolbars>\n"),t+="</MusThGUI>",t},n.XMLConverter.prototype.getNoteIdentifyXML=function(e){var t,n;return n=this.noteNameToParts(e),this.options.clef!=="grandstaff"?(t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',t+='<StaffSystem maxLedgerLines="4">\n',t+='<Staff clef="'+this.options.clef+'">\n',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="1" >',n=this.noteNameToParts(e),t+='<Note letter="'+n.ltr+'" ',t+='register="'+n.reg+'" ',t+='accidental="'+n.acc+'" ',t+='noteValue="whole" editable="false" />',t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>\n",t+="</StaffSystem>\n",t+="</MusThGUI>"):(t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',t+='<StaffSystem maxLedgerLines="4">\n',t+='<Staff clef="treble">\n',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="1" >',parseInt(n.reg,10)>=4&&(t+='<Note letter="'+n.ltr+'" ',t+='register="'+n.reg+'" ',t+='accidental="'+n.acc+'" ',t+='noteValue="whole" editable="false" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>\n",t+='<Staff clef="bass">\n',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="1" >',parseInt(n.reg,10)<4&&
(t+='<Note letter="'+n.ltr+'" ',t+='register="'+n.reg+'" ',t+='accidental="'+n.acc+'" ',t+='noteValue="whole" editable="false" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>\n",t+="</StaffSystem>\n",t+="</MusThGUI>"),t},n.XMLConverter.prototype.getKeyboardInputTextOutput=function(t){var n,r,i,s,o,u;n=e.XML.parse(t),s="",o=n.getElementsByTagName("selectedkey");for(u=0;u<o.length;u++)r=o[u].getAttribute("pitchclass"),i=o[u].getAttribute("register"),s+=r+"-"+i+",";return s.length>0?s=s.substr(0,s.length-1):s="",s},n.XMLConverter.prototype.getKeyboardInputXML=function(e){var t;t='<keyboardinput maxkeys="1" canvasEditable="'+this.options.editable+'">\n',t+="<givenkeys>\n",this.options.includestaticnote==="true"&&(t+='<givenkey pitchclass="'+this.options.staticnotepitchclass+'" register="'+this.options.staticnoteregister+'" />'),t+="</givenkeys>\n",t+="<selectedkeys>\n";if(e!==""&&e!==null&&typeof e!="undefined"){var n=e.split("-"),r=n[0],i=n[1];t+='<selectedkey pitchclass = "'+r+'" register = "'+i+'" />'}return t+="</selectedkeys>\n",t+="</keyboardinput>",t},n.XMLConverter.prototype.getKSWriteTextOutput=function(t){var n=e.XML.parse(t),r="",i=n.getElementsByTagName("Accidental"),s;for(s=0;s<i.length;s++)r+=i[s].getAttribute("letter")+i[s].getAttribute("type")+i[s].getAttribute("register")+",";return r.length>0?r=r.substr(0,r.length-1):r="",r},n.XMLConverter.prototype.getKSWriteXML=function(e){var t,n,r;t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',t+='<StaffSystem maxLedgerLines="0">\n',t+='<Staff clef="'+this.options.clef+'">\n',t+='<KeySign totalAccColumns="7">\n',e===""||e===null||typeof e=="undefined"?n=null:n=e.split(",");if(n!==null)for(r=0;r<n.length;r++)t+='<Accidental type="'+n[r].substr(1,1)+'" letter="'+n[r].substr(0,1)+'" register="'+n[r].substr(2,1)+'" editable="'+this.setNotesEditable+'" />\n';return t+="</KeySign>\n",t+="</Staff>\n",t+="</StaffSystem>\n",t+="    <Toolbars>\n",t+="        <AccidentalToolbar>\n",t+='            <Button symbol="#"/>\n',t+='            <Button symbol="b"/>\n',t+="        </AccidentalToolbar>\n",t+="    </Toolbars>\n",t+="</MusThGUI>",t},n.XMLConverter.prototype.getKSIdentifyXML=function(e){var t,n,r;t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',t+='<StaffSystem maxLedgerLines="0">\n',t+='<Staff clef="'+this.options.clef+'">\n',t+='<KeySign totalAccColumns="7">\n',e===""||e===null||typeof e=="undefined"?n=null:n=e.split(",");if(n!==null)for(r=0;r<n.length;r++)t+='<Accidental type="'+n[r].substr(1,1)+'" letter="'+n[r].substr(0,1)+'" register="'+n[r].substr(2,1)+'" editable="false" />\n';return t+="</KeySign>\n",t+="</Staff>\n",t+="</StaffSystem>\n",t+="    <Toolbars>\n",t+="        <AccidentalToolbar>\n",t+='            <Button symbol="#"/>\n',t+='            <Button symbol="b"/>\n',t+="        </AccidentalToolbar>\n",t+="    </Toolbars>\n",t+="</MusThGUI>",t},n.XMLConverter.prototype.getScaleWriteTextOutput=function(t){var n=e.XML.parse(t),r="",i=n.getElementsByTagName("NoteColumn"),s=0,o,u;for(s=0;s<i.length;s++)o=i[s].getElementsByTagName("Note")[0],typeof o!="undefined"&&o!==null&&(u=o.getAttribute("accidental"),r+=o.getAttribute("letter")+u+o.getAttribute("register")),r+=",";for(s;s<8;s++)r+=",";return r=r.substr(0,r.length-1),r},n.XMLConverter.prototype.getScaleWriteXML=function(e){var t,r,i,s=this.options.givenNote.ltr+this.options.givenNote.acc,o,u,a;this.options.scaleType==="major"?s+="M":s+="m",this.options.includeKS?i=new n.getKeySign(s,this.options.clef):i=[],o='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="'+this.options.includeKS+'">\n',o+='<StaffSystem maxLedgerLines="4">\n',o+='<Staff clef="'+this.options.clef+'">\n',o+='<KeySign totalAccColumns="'+i.length+'">\n';for(t=0;t<i.length;t++)r=this.noteNameToParts(i[t]),o+='<Accidental type="'+r.acc+'" letter="'+r.ltr+'" register="'+r.reg+'" '+'editable="false" />';o+="</KeySign>\n",e===""||e===null||typeof e=="undefined"?u=null:u=e.split(","),o+="<NoteColumns>";if(u!==null)for(t=0;t<u.length;t++)u[t]!==""?(r=this.noteNameToParts(u[t]),o+='<NoteColumn maxNotes="1" >',o+='<Note letter="'+r.ltr+'" ',o+='register="'+r.reg+'" ',o+='accidental="'+r.acc+'" ',t===0?o+='noteValue="whole" editable="false" />':o+='noteValue="whole" editable="'+this.setNotesEditable+'" />',o+="</NoteColumn>"):o+='<NoteColumn maxNotes="1" />';else{this.options.scaleType==="melodic"?a=15:a=8;for(t=0;t<a;t++)t===0?(o+='<NoteColumn maxNotes="1">',o+='<Note letter="'+this.options.givenNote.ltr+'" ',o+='register="'+this.options.givenNote.reg+'" ',o+='accidental="'+this.options.givenNote.acc+'" ',o+='noteValue="whole" editable="false" />',o+="</NoteColumn>"):o+='<NoteColumn maxNotes="1" />'}return o+="</NoteColumns>",o+="</Staff>\n",o+="</StaffSystem>\n",o+="    <Toolbars>\n",o+="        <AccidentalToolbar>\n",o+='            <Button symbol="n"/>',o+='            <Button symbol="#"/>',o+='            <Button symbol="b"/>',o+='            <Button symbol="x"/>',o+='            <Button symbol="bb"/>',o+="        </AccidentalToolbar>\n",o+="    </Toolbars>\n",o+="</MusThGUI>",o},n.XMLConverter.prototype.getMelodicDictationXML=function(e){var t,r,i,s=this.options.givenNote.ltr+this.options.givenNote.acc,o,u;s+="M",this.options.includeKS?i=new n.getKeySign(s,this.options.clef):i=[],o='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="'+this.options.includeKS+'">\n',o+='<StaffSystem maxLedgerLines="4">\n',o+='<Staff clef="'+this.options.clef+'">\n',o+='<KeySign totalAccColumns="'+i.length+'">\n';for(t=0;t<i.length;t++)r=this.noteNameToParts(i[t]),o+='<Accidental type="'+r.acc+'" letter="'+r.ltr+'" register="'+r.reg+'" '+'editable="false" />';o+="</KeySign>\n",e===""||e===null||typeof e=="undefined"?u=null:u=e.split(","),o+="<NoteColumns>";if(u!==null)for(t=0;t<u.length;t++)u[t]!==""?(r=this.noteNameToParts(u[t]),o+='<NoteColumn maxNotes="1" >',o+='<Note letter="'+r.ltr+'" ',o+='register="'+
r.reg+'" ',o+='accidental="'+r.acc+'" ',t===0?o+='noteValue="whole" editable="false" />':o+='noteValue="whole" editable="'+this.setNotesEditable+'" />',o+="</NoteColumn>"):o+='<NoteColumn maxNotes="1" />';else for(t=0;t<this.options.numberofnotes;t++)t===0&&this.options.showFirstNote===!0?(o+='<NoteColumn maxNotes="1">',o+='<Note letter="'+this.options.givenNote[0].ltr+'" ',o+='register="'+this.options.givenNote[0].reg+'" ',o+='accidental="'+this.options.givenNote[0].acc+'" ',o+='noteValue="whole" editable="false" />',o+="</NoteColumn>"):o+='<NoteColumn maxNotes="1" />';return o+="</NoteColumns>",o+="</Staff>\n",o+="</StaffSystem>\n",o+="    <Toolbars>\n",o+="        <AccidentalToolbar>\n",o+='            <Button symbol="n"/>',o+='            <Button symbol="#"/>',o+='            <Button symbol="b"/>',o+='            <Button symbol="x"/>',o+='            <Button symbol="bb"/>',o+="        </AccidentalToolbar>\n",o+="    </Toolbars>\n",o+="</MusThGUI>",o},n.XMLConverter.prototype.getScaleIdentifyXML=function(e){var t,r,i,s=this.options.givenNote.ltr+this.options.givenNote.acc,o,u,a;this.options.scaleType==="major"?s+="M":s+="m",this.options.includeKS?i=new n.getKeySign(s,this.options.clef):i=[],o='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="'+this.options.includeKS+'">\n',o+='<StaffSystem maxLedgerLines="4">\n',o+='<Staff clef="'+this.options.clef+'">\n',o+='<KeySign totalAccColumns="'+i.length+'">\n';for(t=0;t<i.length;t++)r=this.noteNameToParts(i[t]),o+='<Accidental type="'+r.acc+'" letter="'+r.ltr+'" register="'+r.reg+'" '+'editable="false" />';o+="</KeySign>\n",e===""||e===null||typeof e=="undefined"?u=null:u=e.split(","),o+="<NoteColumns>";if(u!==null)for(t=0;t<u.length;t++)u[t]!==""?(r=this.noteNameToParts(u[t]),o+='<NoteColumn maxNotes="1" >',o+='<Note letter="'+r.ltr+'" ',o+='register="'+r.reg+'" ',o+='accidental="'+r.acc+'" ',o+='noteValue="whole" editable="false" />',o+="</NoteColumn>"):o+='<NoteColumn maxNotes="1" />';else{this.options.scaleType==="melodic"?a=15:a=8;for(t=0;t<a;t++)t===0?(o+='<NoteColumn maxNotes="1">',o+='<Note letter="'+this.options.givenNote.ltr+'" ',o+='register="'+this.options.givenNote.reg+'" ',o+='accidental="'+this.options.givenNote.acc+'" ',o+='noteValue="whole" editable="false" />',o+="</NoteColumn>"):o+='<NoteColumn maxNotes="1" />'}return o+="</NoteColumns>",o+="</Staff>\n",o+="</StaffSystem>\n",o+="</MusThGUI>",o},n.XMLConverter.prototype.getIntervalWriteTextOutput=function(t){var n=e.XML.parse(t),r="",i=n.getElementsByTagName("Note"),s=0,o;for(s=0;s<i.length;s++)i[s].getAttribute("editable")==="true"&&(o=i[s].getAttribute("accidental"),r+=i[s].getAttribute("letter")+o+i[s].getAttribute("register")+",");return r.length>0?r=r.substr(0,r.length-1):r="",r},n.XMLConverter.prototype.getIntervalWriteXML=function(e){var t,n;return t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',t+='<StaffSystem maxLedgerLines="4">',t+='<Staff clef="'+this.options.clef+'">',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="2" >',t+='<Note letter="'+this.options.givenNote.ltr+'" ',t+='register="'+this.options.givenNote.reg+'" ',t+='accidental="'+this.options.givenNote.acc+'" ',t+='noteValue="whole" editable="false" />',e!==""&&e!==null&&typeof e!="undefined"&&(n=this.noteNameToParts(e),t+='<Note letter="'+n.ltr+'" ',t+='register="'+n.reg+'" ',t+='accidental="'+n.acc+'" ',t+='noteValue="whole" editable="'+this.setNotesEditable+'" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>",t+="</StaffSystem>",t+="    <Toolbars>\n",t+="        <AccidentalToolbar>\n",t+='            <Button symbol="n"/>',t+='            <Button symbol="#"/>',t+='            <Button symbol="b"/>',t+='            <Button symbol="x"/>',t+='            <Button symbol="bb"/>',t+="        </AccidentalToolbar>\n",t+="    </Toolbars>\n",t+="</MusThGUI>",t},n.XMLConverter.prototype.getIntervalIdentifyXML=function(e){var t,n;return t='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',t+='<StaffSystem maxLedgerLines="4">',t+='<Staff clef="'+this.options.clef+'">',t+='<KeySign totalAccColumns="0" >',t+="</KeySign>",t+="<NoteColumns>",t+='<NoteColumn maxNotes="2" >',t+='<Note letter="'+this.options.givenNote.ltr+'" ',t+='register="'+this.options.givenNote.reg+'" ',t+='accidental="'+this.options.givenNote.acc+'" ',t+='noteValue="whole" editable="false" />',e!==""&&e!==null&&typeof e!="undefined"&&(n=this.noteNameToParts(e),t+='<Note letter="'+n.ltr+'" ',t+='register="'+n.reg+'" ',t+='accidental="'+n.acc+'" ',t+='noteValue="whole" editable="false" />'),t+="</NoteColumn>",t+="</NoteColumns>",t+="</Staff>",t+="</StaffSystem>",t+="    <Toolbars>\n",t+="        <AccidentalToolbar>\n",t+='            <Button symbol="n"/>',t+='            <Button symbol="#"/>',t+='            <Button symbol="b"/>',t+='            <Button symbol="x"/>',t+='            <Button symbol="bb"/>',t+="        </AccidentalToolbar>\n",t+="    </Toolbars>\n",t+="</MusThGUI>",t},n.XMLConverter.prototype.getChordQualityWriteXML=function(e){var t,n,r,i;r='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',r+='<StaffSystem maxLedgerLines="4">',r+='<Staff clef="'+this.options.clef+'">',r+='<KeySign totalAccColumns="0"></KeySign>\n',r+="<NoteColumns>",r+='<NoteColumn maxNotes="'+this.options.maxNotes+'" >';if(e!==""&&e!==null&&typeof e!="undefined"){i=e.split(",");for(n=0;n<i.length;n++)i[n]!==""&&(t=this.noteNameToParts(i[n]),r+='<Note letter="'+t.ltr+'" ',r+='register="'+t.reg+'" ',r+='accidental="'+t.acc+'" ',r+='noteValue="whole" editable="'+this.setNotesEditable+'" />')}return r+="</NoteColumn>",r+="</NoteColumns>",r+="</Staff>",r+="</StaffSystem>",r+="    <Toolbars>\n",r+="        <AccidentalToolbar>\n",r+='            <Button symbol="n"/>',r+='            <Button symbol="#"/>',r+='            <Button symbol="b"/>',r+='            <Button symbol="x"/>',r+='            <Button symbol="bb"/>'
,r+="        </AccidentalToolbar>\n",r+="    </Toolbars>\n",r+="</MusThGUI>",r},n.XMLConverter.prototype.getHarmonicfunctionWriteTextOutput=function(t){var n=e.XML.parse(t),r="",i=n.getElementsByTagName("NoteColumn"),s=0,o=0,u,a,f;for(s=0;s<i.length;s++){a=i[s].getElementsByTagName("Note");for(o=a.length-1;o>=0;o--)u=a[o],typeof u!="undefined"&&u!==null&&(f=u.getAttribute("accidental"),r+=u.getAttribute("letter")+f+u.getAttribute("register")),r+=","}return r=r.substr(0,r.length-1),r},n.XMLConverter.prototype.getHarmonicFunctionWriteXML=function(e){var t,r,i,s,o;s='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',s+='<StaffSystem maxLedgerLines="4">',s+='<Staff clef="'+this.options.clef+'">',this.options.includeKS?t=new n.getKeySign(this.options.key,this.options.clef):t=[],s+='<KeySign totalAccColumns="'+t.length+'">\n';for(i=0;i<t.length;i++)r=this.noteNameToParts(t[i]),s+='<Accidental type="'+r.acc+'" letter="'+r.ltr+'" register="'+r.reg+'" '+'editable="false" />';s+="</KeySign>\n",s+="<NoteColumns>",s+='<NoteColumn maxNotes="'+this.options.maxNotes+'" >';if(e!==""&&e!==null&&typeof e!="undefined"){o=e.split(",");for(i=0;i<o.length;i++)o[i]!==""&&(r=this.noteNameToParts(o[i]),s+='<Note letter="'+r.ltr+'" ',s+='register="'+r.reg+'" ',s+='accidental="'+r.acc+'" ',s+='noteValue="whole" editable="'+this.setNotesEditable+'" />')}return s+="</NoteColumn>",s+="</NoteColumns>",s+="</Staff>",s+="</StaffSystem>",s+="    <Toolbars>\n",s+="        <AccidentalToolbar>\n",s+='            <Button symbol="n"/>',s+='            <Button symbol="#"/>',s+='            <Button symbol="b"/>',s+='            <Button symbol="x"/>',s+='            <Button symbol="bb"/>',s+="        </AccidentalToolbar>\n",s+="    </Toolbars>\n",s+="</MusThGUI>",s},n.XMLConverter.prototype.getHarmonicFunctionIdentifyXML=function(e){var t,r,i,s,o;s='<MusThGUI canvasEditable="'+this.options.editable+'" accidentalCarryOver="true">\n',s+='<StaffSystem maxLedgerLines="4">',s+='<Staff clef="'+this.options.clef+'">',this.options.includeKS?t=new n.getKeySign(this.options.key,this.options.clef):t=[],s+='<KeySign totalAccColumns="'+t.length+'">\n';for(i=0;i<t.length;i++)r=this.noteNameToParts(t[i]),s+='<Accidental type="'+r.acc+'" letter="'+r.ltr+'" register="'+r.reg+'" '+'editable="false" />';s+="</KeySign>\n",s+="<NoteColumns>";if(e!==""&&e!==null&&typeof e!="undefined"){o=e.split(","),s+='<NoteColumn maxNotes="'+o.length+'" >';for(i=0;i<o.length;i++)o[i]!==""&&(r=this.noteNameToParts(o[i]),s+='<Note letter="'+r.ltr+'" ',s+='register="'+r.reg+'" ',s+='accidental="'+r.acc+'" ',s+='noteValue="whole" editable="false" />');s+="</NoteColumn>"}else s+='<NoteColumn maxNotes="0" />';return s+="</NoteColumns>",s+="</Staff>",s+="</StaffSystem>",s+="</MusThGUI>",s},n.XMLConverter.prototype.noteNameToParts=function(e){var t=[],n;return e.search("-")<0?n=e.length:n=e.search("-"),t.ltr=e.substr(0,1),t.acc=e.substr(1,n-2),t.reg=e.substr(n-1,1),e.search("-")>=0?t.clef=e.substr(n+1):t.clef="",t}},"@VERSION@",{requires:["base","node","datatype","node-event-simulate"]});
