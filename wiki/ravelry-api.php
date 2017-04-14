<?php
/**
 * @file
 * The Ravelry API does not yet support Oauth 2.0 and thus requires server-side access rather than client-side access.
 */

return random_rav();

function random_rav() {
  $u = "";
  $p = "";
  $api_url = "https://" . $u . ":" . $p  ."@api.ravelry.com/patterns/";
  $random = rand(1, 99999);
  return file_get_contents($api_url . $random . '.json');
}