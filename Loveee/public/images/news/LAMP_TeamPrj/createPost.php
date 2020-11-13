<?php
  require "header.php";
  if(isset($_POST["btn_submit"])){
    $title = $_POST["title"];
    $subtitle = $_POST["subtitle"];
    $content = $_POST["content"];
    $time = getdate();
    $author_id = "";
    $category_id = "";

    $query = "SELECT u_id FROM users WHERE username = ".$_SESSION["username"];
    foreach(connection->query($query) as $row){
        $author_id = $row["u_id"];
    }

    $query = "SELECT c_id FROM category WHERE category = '".$_POST["category"]."'";
    foreach(connection->query($query) as $row){
        $category_id = $row["c_id"];
    }

    $image = $_FILES['image']['name'];
    $img_target = "img/posts/".basename($image);
    $query = "INSERT INTO post(title, subtitle, content, `time`, author_id, category_id, `image`, `status`) VALUES('".$title."','".$subtitle."','".$content."','".$time."',".$author_id.",".$category_id.",'".$image."',0)";
    $connection->query($query);
    
    if(move_uploaded_file($_FILES['image']['tmp_name'], $img_target)){
        echo "<script>alert('Upload success')</script>";
    }
    else{
        echo "<script>alert('Upload failed')</script>";
    }    
  }
?>
  
  <!-- New Post Section Begin -->
  <section class="mt-5">
    <form action="" method="POST" class="container rounded bg-white p-5">
        <div class="row">
            <div class="col-12">
                <div class="section-title">
                    <h4>New post</span></h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-lg-8 col-md-8">
                <label for="title" class="text-left font-weight-bold">Title</label>
                <input type="text" name="title" id="title" class="form-control"
                    placeholder="Title">
            </div>
            <div class="form-group col-lg-4 col-md-4">
                <label for="catalog" class="text-left font-weight-bold">Catalog</label>
                <select class="form-control" name="catalog" id="catalog">
                    <?php
                        $query = "SELECT * FROM category";
                        foreach($connection->query($query) as $row){
                            echo "<option>".$row["category_name"]."</option>";
                        }
                    ?>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-3">
                <div class="font-weight-bold label">Images</div>
                <div class="row">
                    <div id="preview"></div>
                    <label class="btn" id="hide-input">
                        <img src="img/newImage.png" style="width: 80px;"
                            alt="Add new image">
                        <input id="file-input" name="file-input" type="file" hidden>
                    </label>
                </div>
                <script type="text/javascript">
                    var evImage = document.getElementById('file-input');
                    evImage.onchange = function () {
                        var preview = document.querySelector('#preview');

                        if (this.files) {
                            [].forEach.call(this.files, readAndPreview);
                        }

                        function readAndPreview(file) {

                            if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                                return alert(file.name + " is not an image");
                            } 

                            var reader = new FileReader();

                            reader.addEventListener("load", function () {
                                var image = new Image();
                                image.height = 100;
                                image.title = file.name;
                                image.src = this.result;
                                image.classList.add('p-3');
                                preview.appendChild(image);
                            });

                            reader.readAsDataURL(file);

                            document.getElementById('hide-input').style.display = "none";
                        }
                    }
                </script>
            </div>
            <div class="form-group col-9">
                <label for="subtitle" class="text-left font-weight-bold">Subtitle</label>
                <textarea rows="5" class="form-control form-control-line" id="subtitle" name="subtitle" ></textarea>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-12">
                <label for="content" class="font-weight-bold">Description</label>
                <input type="text" name="content" id="content" class="form-control">
                <script src="https://cdn.ckeditor.com/4.15.0/standard/ckeditor.js"></script>
                <script>
                    CKEDITOR.replace('content');
                </script>
            </div>
        </div>
        <div class="row">
            <div class="col-6 text-right">
                <button type="button" class="btn btn-info" name="btn_submit">Submit</button>
            </div>
            <div class="col-6 text-left">
                <a href="index.php" class="btn btn-danger">Cancel</a>
            </div>
        </div>
    </div>
</section>
<!-- New Post Section End -->

<?php
  require "footer.php";
?>