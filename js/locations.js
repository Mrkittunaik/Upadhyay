/* locations.js — country list (A to Z) and India State > District > City > Area > PIN data.
   Used by the Location step of the institution profile. Only India has detailed lists for now;
   a state, district or city with no data listed here falls back to typing it in by hand.
   Add more data in the INDIA object below, same shape: State -> District -> City -> Area -> 'PIN'. */
(function(){
var COUNTRIES=['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Republic)','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];

var INDIA={
 'Telangana':{
  'Hyderabad':{
   'Hyderabad':{'Abids':'500001','Ameerpet':'500016','Banjara Hills':'500034','Begumpet':'500016','Charminar':'500002','Dilsukhnagar':'500060','Gachibowli':'500032','Himayatnagar':'500029','Jubilee Hills':'500033','Kondapur':'500084','Kukatpally':'500072','LB Nagar':'500074','Madhapur':'500081','Miyapur':'500049','Somajiguda':'500082','Uppal':'500039'},
   'Secunderabad':{'Bowenpally':'500011','Secunderabad':'500003','Trimulgherry':'500015'}},
  'Rangareddy':{'Shamshabad':{'Shamshabad':'501218'},'Ibrahimpatnam':{'Ibrahimpatnam':'501506'},'Chevella':{'Chevella':'501503'}},
  'Medchal-Malkajgiri':{'Malkajgiri':{'Malkajgiri':'500047'},'Medchal':{'Medchal':'501401'}},
  'Warangal':{'Warangal':{'Hanamkonda':'506001','Warangal':'506002'}},
  'Karimnagar':{'Karimnagar':{'Karimnagar':'505001'}},
  'Nizamabad':{'Nizamabad':{'Nizamabad':'503001'}},
  'Khammam':{'Khammam':{'Khammam':'507001'}}},
 'Andhra Pradesh':{
  'Visakhapatnam':{'Visakhapatnam':{'Dwaraka Nagar':'530016','Gajuwaka':'530026','Madhurawada':'530048','MVP Colony':'530017'}},
  'Krishna':{'Vijayawada':{'Benz Circle':'520010','Governorpet':'520002'}},
  'Guntur':{'Guntur':{'Brodipet':'522002'}},
  'Tirupati':{'Tirupati':{'Tirupati':'517501'}},
  'Anantapur':{'Anantapur':{'Anantapur':'515001'}},
  'Kurnool':{'Kurnool':{'Kurnool':'518001'}},
  'Nellore':{'Nellore':{'Nellore':'524001'}}},
 'Karnataka':{
  'Bengaluru Urban':{'Bengaluru':{'BTM Layout':'560076','Electronic City':'560100','HSR Layout':'560102','Indiranagar':'560038','Jayanagar':'560011','Koramangala':'560034','Malleshwaram':'560003','MG Road':'560001','Whitefield':'560066'}},
  'Mysuru':{'Mysuru':{'Mysuru':'570001'}},
  'Dakshina Kannada':{'Mangaluru':{'Mangaluru':'575001'}},
  'Dharwad':{'Dharwad':{'Dharwad':'580001'},'Hubballi':{'Hubballi':'580020'}}},
 'Tamil Nadu':{
  'Chennai':{'Chennai':{'Adyar':'600020','Anna Nagar':'600040','Mylapore':'600004','T. Nagar':'600017','Velachery':'600042'}},
  'Chengalpattu':{'Tambaram':{'Tambaram':'600045'}},
  'Coimbatore':{'Coimbatore':{'Gandhipuram':'641012','RS Puram':'641002'}},
  'Madurai':{'Madurai':{'Madurai':'625001'}},
  'Tiruchirappalli':{'Tiruchirappalli':{'Tiruchirappalli':'620001'}}},
 'Maharashtra':{
  'Mumbai City':{'Mumbai':{'Colaba':'400005','Dadar':'400014'}},
  'Mumbai Suburban':{'Mumbai':{'Andheri West':'400058','Bandra West':'400050','Borivali West':'400092','Powai':'400076'}},
  'Pune':{'Pune':{'Hadapsar':'411028','Hinjewadi':'411057','Kothrud':'411038','Shivajinagar':'411005','Viman Nagar':'411014'}},
  'Nagpur':{'Nagpur':{'Dharampeth':'440010','Sitabuldi':'440012'}}},
 'Delhi':{
  'New Delhi':{'New Delhi':{'Connaught Place':'110001','Hauz Khas':'110016','Lajpat Nagar':'110024','Saket':'110017','Vasant Kunj':'110070'}},
  'North Delhi':{'Delhi':{'Karol Bagh':'110005','Rohini':'110085'}},
  'South West Delhi':{'Delhi':{'Dwarka':'110075'}}},
 'Kerala':{
  'Thiruvananthapuram':{'Thiruvananthapuram':{'Thiruvananthapuram':'695001'}},
  'Ernakulam':{'Kochi':{'Ernakulam':'682001','Kakkanad':'682030'}},
  'Kozhikode':{'Kozhikode':{'Kozhikode':'673001'}}},
 'Gujarat':{
  'Ahmedabad':{'Ahmedabad':{'Maninagar':'380008','Navrangpura':'380009','Satellite':'380015'}},
  'Surat':{'Surat':{'Surat':'395003'}},
  'Vadodara':{'Vadodara':{'Vadodara':'390001'}}},
 'Uttar Pradesh':{
  'Lucknow':{'Lucknow':{'Gomti Nagar':'226010','Hazratganj':'226001'}},
  'Gautam Buddha Nagar':{'Noida':{'Sector 18':'201301','Sector 62':'201309'}},
  'Varanasi':{'Varanasi':{'Varanasi':'221001'}},
  'Kanpur Nagar':{'Kanpur':{'Kanpur':'208001'}},
  'Agra':{'Agra':{'Agra':'282001'}}},
 'West Bengal':{
  'Kolkata':{'Kolkata':{'Park Street':'700016','Salt Lake':'700091'}},
  'Howrah':{'Howrah':{'Howrah':'711101'}}},
 'Rajasthan':{
  'Jaipur':{'Jaipur':{'C-Scheme':'302001','Malviya Nagar':'302017','Vaishali Nagar':'302021'}},
  'Jodhpur':{'Jodhpur':{'Jodhpur':'342001'}},
  'Udaipur':{'Udaipur':{'Udaipur':'313001'}}},
 'Punjab':{
  'Ludhiana':{'Ludhiana':{'Ludhiana':'141001'}},
  'Amritsar':{'Amritsar':{'Amritsar':'143001'}}},
 'Chandigarh':{'Chandigarh':{'Chandigarh':{'Sector 17':'160017','Sector 22':'160022'}}},
 'Haryana':{
  'Gurugram':{'Gurugram':{'DLF Phase 1':'122002','Sector 29':'122001'}},
  'Faridabad':{'Faridabad':{'Faridabad':'121001'}}},
 'Madhya Pradesh':{
  'Bhopal':{'Bhopal':{'Arera Colony':'462016','MP Nagar':'462011'}},
  'Indore':{'Indore':{'Palasia':'452001','Vijay Nagar':'452010'}}},
 'Odisha':{'Khordha':{'Bhubaneswar':{'Patia':'751024','Saheed Nagar':'751007'}}},
 'Bihar':{'Patna':{'Patna':{'Boring Road':'800001','Kankarbagh':'800020'}}}
};

/* every other state and union territory is listed so it can be chosen; its lower levels are typed in */
['Andaman and Nicobar Islands','Arunachal Pradesh','Assam','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Goa','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Ladakh','Lakshadweep','Manipur','Meghalaya','Mizoram','Nagaland','Puducherry','Sikkim','Tripura','Uttarakhand'].forEach(function(s){ if(!INDIA[s]) INDIA[s]={}; });

window.UP_LOC={countries:COUNTRIES,india:INDIA};
})();
