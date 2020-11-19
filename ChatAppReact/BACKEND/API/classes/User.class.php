<?php
    class User
    {
        private $serverName = 'localhost';
        private $userName = 'root';
        private $password = '';
        private $dbName = 'chat';
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
        public function getUserByUsername($username)
        {
            $ary = [];
            try
            {
                $query = "SELECT * FROM users WHERE username = :username";
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":username" => $username));
                $result = $stmt->rowCount();
                if($result > 0)
                {
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    $ary = array("flg" => 1, "user" => $user);
                    return $ary;
                }
                else
                {
                    $ary = array("flg" => 0);
                    return $ary;
                }
            }
            catch(Exception $e)
            {
                $ary = array("flg" => -1, "msg" => $e->getMessage());
                return $ary;
            }
        }
        
        public function insertUser($username,$password,$image)
        {
            $ary = [];
            $result = $this->getUserByUsername($username);
            if($result['flg'] == 0)
            {
                try
                {
                    $query = "INSERT INTO users(username,password,image) VALUES (:username,:password,:image);";
                    $stmt = $this->pdoConnection->prepare($query);
                    $password = sha1($password);
                    $stmt->execute(array(":username" => $username, ":password" => $password, ":image" => $image));
                    $ary = array("flg" => 1);
                    return $ary;
                }
                catch(Exception $e)
                {
                    $ary = array("flg" => 0, "msg" => $e->getMessage());
                    return $ary;
                }
            }
            else
            {
                $ary = array("flg" => -1);
                return $ary;
            }
        }

        public function getUsers()
        {
            if($this->established)
            {
                $query = "SELECT * FROM users";
                $result = $this->connection->query($query);
                if($this->connection->error)
                {
                    return -2;
                }
                else
                {
                    $users = [];
                    while($row = $result->fetch_assoc())
                    {
                        $users[] = $row;
                    }
                    return $users;
                }
            }
            else
            {
                return -1;
            }
        }

        public function checkFriendshipStatus($userId,$friendId)
        {
            try
            {
                $query = "SELECT * FROM friends WHERE user_id = :userId AND friend_id = :friendId;";
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId, ":friendId" => $friendId));
                if($stmt->rowCount() > 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch(Exception $e)
            {
                return -1;
            }
        }

        public function checkRequestStatus($userId,$friendId)
        {
            try
            {
                $query = 'SELECT * FROM requests WHERE from_id = :userId AND to_id = :friendId';
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId, "friendId" => $friendId));
                if($stmt->rowCount() > 0)
                {
                    $ary = array("flg" => 1);
                    return $ary;
                }
                else
                {
                    $ary = array("flg" => 0);
                    return $ary;
                }
            }
            catch(Exception $e)
            {
                $ary = array("flg" => -1, "msg" => $e->getMessage());
                return $ary;
            }
        }

        public function sendFriendRequest($userId,$friendId)
        {
            try
            {
                $query = 'INSERT INTO requests VALUES(:userId,:friendId);';
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId,":friendId" => $friendId));
                $ary = array("flg" => 1);
                return $ary;
            }
            catch (Exception $e)
            {
                $ary = array("flg" => 0, "msg" => $e->getMessage());
                return $ary;
            }
        }

        public function changeLogStatus($userId)
        {
            try
            {
                $query = 'UPDATE users SET log_status = 1 WHERE user_id = :userId';
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId));
                $ary = array("flg" => 1);
                return $ary;
            }
            catch(Exception $e)
            {
                $ary = array("flg" => 0, "msg" => $e->getMessage());
                return $ary;
            }
        }

        public function logout($userId)
        {
            try
            {
                $query = "UPDATE users SET log_status = 0 WHERE user_id = :userId";
                $stmt = $this->pdoConnection->prepare($query);
                $stmt->execute(array(":userId" => $userId));
                $ary = array("flg" => 1);
                return $ary;
            }
            catch(Exception $e)
            {
                $ary = array("flg" => 0, "msg" => $e->getMessage());
                return $ary;
            }
        }

        public function seed()
        {
            try
            {
                $query = "DELETE FROM users WHERE username <> 'Admin'";
                $stmt = $this->pdoConnection->query($query);
                $array = array("flg" => 1);
                return $array;
            }
            catch(Error $e)
            {
                $array = array("flg" => 0 , "msg" => $e->getMessage());
                return $array;
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