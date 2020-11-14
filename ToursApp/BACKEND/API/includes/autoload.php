<?php
    spl_autoload_register('loadClass');
    function loadClass($className)
    {
        $path = './classes/' . $className . '.class.php';
        require_once($path);
    }
?>