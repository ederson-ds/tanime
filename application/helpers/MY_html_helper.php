<?php

function getControllerName($pages, $controllerName) {
    foreach ($pages as $value) {
        foreach ($value['subpages'] as $value) {
            if ($controllerName == $value['urlName']) {
                return $value['name'];
            }
        }
    }
}
