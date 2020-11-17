<?php
    class Request
    {
        private $serverName = 'localhost';
        private $userName = 'root';
        private $password = '';
        private $dbName = 'chat';
        private $connection;
        private $pdoConnection;
        private $established = false;
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
        }

        public function getUserRequests($userId)
        {
            try
            {
                $query = "SELECT user_id,username,image from users INNER JOIN requests ON users.user_id = requests.from_id WHERE requests.to_id = :userId";
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId));
                $requests = [];
                while($row = $stmt->fetch(PDO::FETCH_ASSOC))
                {
                    $requests[] = $row;
                }
                $ary = array("flg" => 1, "requests" => $requests);
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