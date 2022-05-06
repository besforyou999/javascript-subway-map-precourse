let station_manager_btn, line_manager_btn, section_manager_btn, print_subway_btn;

function createDiv() {
  // 1. <div> element 만들기
  const newDiv = document.createElement('div');
  
  // 2. <div>에 들어갈 text node 만들기
  const newText = document.createTextNode('역이름');
  
  // 3. <div>에 text node 붙이기
  newDiv.appendChild(newText);
  
  // 4. <body>에 1에서 만든 <div> element 붙이기
  document.body.appendChild(newDiv);


  return false;
} 

window.onload = function() {
  let station_manager_btn = document.getElementById("#station-manager-button");
  let line_manager_btn    = document.getElementById("#line-manager-button");
  let section_manager_btn = document.getElementById("#section-manager-button");
  let print_subway_btn    = document.getElementById("#map-print-manager-button");

  station_manager_btn.addEventListener("click", createDiv, false);

  line_manager_btn.addEventListener("click", function(e) {
    console.log("stop bubling : line manager btn");
  }, false);

  section_manager_btn.addEventListener("click", function(e) {
    console.log("stop bubbling, section manager btn");
  }, false);

  print_subway_btn.addEventListener("click", function(e) {
    console.log("stop bubbling, print_subway_btn");
  }, false);
}