<?php 
//Connexion a la base de données
$servername = "localhost";
$username ="root";
$password = "";
$dbname = "trello";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn -> connect_error){
    die("Connexion échouée : "  . $conn->connect_error);
}

$sql = "SELECT * FROM groupe";
$column = $conn->query($sql);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TPTrello</title>
    <link rel="stylesheet" href="https://use.typekit.net/gse7msm.css">
    <link rel="stylesheet" href="style.css">
</head>
    <body>
        <!--navbar-->
        <div class="navbar">
            <h1>Trello de Sevan</h1>

            <div id="add" class="add">
                <p>+</p>
            </div>
        </div>
        <!--cards-->
        <div id="card-container" class="card-container">
        <?php 
        foreach($column as $col)
        {
            echo('
            <div class="card" id="card'.$col['id'].'">
                            <div class="card-title">
                                '.$col['title'].'
                            </div>
                                <div class="closecol">
                                <p>x</p>
                                </div>');
                                
                                        $blocQuery = "SELECT * FROM tasks where id_groupe = ?"; 
                                        $blocos = $conn->prepare($blocQuery);
                                        $blocos ->bind_param('s',$col['id']);
                                        $blocos ->execute();

                                        // Résultat de la requête
                                        $blocs = $blocos->get_result();

                                        // Vérifier s'il y a des résultats
                                        if ($blocs->num_rows > 0) 
                                        {
                                            // Parcourir chaque ligne de résultat
                                            while($rowtemp = $blocs->fetch_assoc()) 
                                            {
                                                // Afficher la valeur de la variable "titre" pour chaque ligne
                                                echo '
                                                <div class="bloc">  

                                                    <div class="blochead">
                                                        <div class="edit" id="edit'.$rowtemp["id"].'">
                                                            <p>edit</p>
                                                        </div>
                                                        <div class="done" id="check'.$rowtemp["id"].'">
                                                            <p>x</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="bloc-title">
                                                        <p class="btitle" id="title'.$rowtemp["id"].'">
                                                        '.$rowtemp["title"].'
                                                        </p>
                                                    </div>

                                                    <div class="bloc-desc">
                                                        <p class="bdesc" id="desc'.$rowtemp["id"].'">
                                                        '.$rowtemp["description"].'
                                                        </p>
                                                    </div>

                                                    <div class="bloc-cate">
                                                        <p class="bcate" id="cate'.$rowtemp["id"].'">
                                                        '.$rowtemp["categorie"].'
                                                        </p>
                                                    </div>
                                                </div>
                                                ';
                                            }
                                        }
                            echo'     
                            
                            <div class="addbloc" id="addBloc'.$col["id"].'">
                                <p>+</p>
                            </div>
                </div>';
        }
        ?>
        </div>

        <!--modal add-bloc form-->
        <div id="addbloc-form" class="form-container">

            <div class="card-title">
                Ajouter une tache
            </div>

            <div class="close">
                <p id="close-bloc-form">x</p>
            </div>
            
            <form id="form" name="form" action="">
                <input class="in" type="text" id="title" placeholder="Titre"/>
                <input class="in" type="text" id="description" placeholder="Description"/>
                <input class="in" type="text" id="cate" placeholder="Categorie"/>
                <input class="addbtn" id="blocSub" type="submit" value="+" name="submit">
            </form>
        </div>

        <!--modal edit-bloc form-->
        <div id="editbloc-form" class="form-container">

            <div class="card-title">
                Modifier une tache
            </div>

            <div class="close">
                <p id="closedit">x</p>
            </div>
            
            <form id="formEdit" name="form" action="">
                <input class="in" type="text" name="title" id="titleEdit" placeholder="Titre"/>
                <input class="in" type="text" name="description" id="descriptionEdit" placeholder="Description"/>
                <input class="in" type="text" id="cateEdit" placeholder="Categorie"/>
                <input class="addbtn" id="editblocSub" type='submit' value="+">
            </form>
        </div>

        <!-- modal column form-->
        <div id="column-form" class="form-container">

            <div class="card-title">
                Ajouter une catégorie
            </div>

            <div class="close">
                <p id="close">x</p>
            </div>
            
            <form>
                <input id="col-input" type="text" placeholder="Titre"/>
                <input class="addbtn" id="sub" type="submit" value="+">
            </form>
        </div>
    <script src="script.js"></script>
    </body>
</html>

<?php 
mysqli_close($conn)
?>
