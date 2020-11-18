<?php
    class Friend
    {
        private $serverName = 'localhost';
        private $userName = 'root';
        private $password = '';
        private $dbName = 'chat';
        private $connection;
        private $established = false;
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

        public function addFriend($userId,$friendId)
        {
            try
            {
                $query = "INSERT INTO friends VALUES(:friendId,:userId)";
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":friendId" => $friendId, ":userId" => $userId));
                $ary = array("flg" => 1);
                return $ary;
            }
            catch(Exception $e)
            {
                $ary = array("flg" => 0, "msg" => $e->getMessage());
                return $ary;
            }
            
        }

        public function getUserFriends($userId)
        {
            try
            {
                $query = "SELECT users.user_id, users.username, users.image, users.log_status FROM users INNER JOIN friends ON users.user_id = friends.friend_id WHERE friends.user_id = :userId";
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId));
                $friends = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC))
                {
                    $friends[] = $row;
                }
                $ary = array("flg" => 1, "friends" => $friends);
                return $ary;
            }
            catch(Exception $e)
            {
                $ary = array("flg" => -1, "msg" => $e->getMessage());
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