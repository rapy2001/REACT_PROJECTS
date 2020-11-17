<?php
    class Message
    {
        private $serverName = 'localhost';
        private $userName = 'root';
        private $password = '';
        private $dbName = 'chat';
        private $established = false;
        private $connection;
        private $pdoConnection;

        public function __construct()
        {
            $this->connection = new mysqli($this->serverName,$this->userName,$this->password,$this->dbName);
            if($this->connection->connect_error)
            {
                $this->established = false;
            }
            else
            {
                $this->established = true;
            }
            $this->pdoConnection = new PDO("mysql:host=$this->serverName;dbname=$this->dbName",$this->userName,$this->password);
            $this->pdoConnection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        }
        public function addMessage($fromId,$toId,$message)
        {
            try
            {
                $query = 'INSERT INTO messages VALUES(0,:fromId,:toId,:messageText,NOW());';
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":fromId" => $fromId, ":toId" => $toId, ":messageText" => $message));
                $ary = array("flg" => 1);
                return $ary;
            }
            catch(Exception $e)
            {
                $ary = array("flg" => -1,"msg" => $e->getMessage());
                return $ary;
            }
        }

        public function getMessages($userId,$friendId)
        {
            try
            {
                $query = 'SELECT * FROM messages WHERE from_id = :fromId AND to_id = :toId OR from_id = :FROMID AND to_id = :TOID';
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":fromId" => $userId, ":toId" => $friendId, ":FROMID" => $friendId, ":TOID" => $userId));
                $messages = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC))
                {
                    $messages[] = $row;
                }
                $ary = array("flg" => 1, "messages" => $messages);
                return $ary;
            }
            catch(Exception $e)
            {
                $ary = array("flg" => -1,"msg" => $e->getMessage());
                return $ary;
            }
        }
        public function __destruct()
        {
            if($this->established)
            {
                $this->connection->close();
            }
        }
    }
?>