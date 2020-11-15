<?php
    spl_autoload_register('loadClass');

    function loadClass($className)
    {
        $pathname = './classes/' . $className . '.class.php';
        require_once($pathname);
    }
?>