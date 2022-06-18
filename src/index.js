import {createDivStation} from './createDivStation.js';
import {createDivLine} from './createDivLine.js';
import {createDivPrint} from './createDivPrint.js';
import {createDivSection} from './createDivSection.js';

let station_manager_btn, line_manager_btn, section_manager_btn, print_subway_btn;

window.onload = function() {
  let station_manager_btn = document.getElementById("#station-manager-button");
  let line_manager_btn    = document.getElementById("#line-manager-button");
  let section_manager_btn = document.getElementById("#section-manager-button");
  let print_subway_btn    = document.getElementById("#map-print-manager-button");

  station_manager_btn.addEventListener("click", createDivStation, false);

  line_manager_btn.addEventListener("click", createDivLine, false);

  section_manager_btn.addEventListener("click", createDivSection, false);

  print_subway_btn.addEventListener("click", createDivPrint, false);
}