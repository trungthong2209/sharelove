<?php
  require "header.php";
?>

  <!-- Page Header -->
  <?php
    $query = "SELECT * FROM SELECT * FROM post, users WHERE p_id = ".$_GET["id"]." AND post.author_id = users.u_id";
    foreach($connection->query($query) as $row){
  ?>
  <header class="masthead" style="background-image: url('<?php echo $row["image"];?>')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-heading">
            <h1><?php echo $row["title"]?></h1>
            <h2 class="subheading"><?php echo $row["subtitle"];?></h2>
            <span class="meta">Posted by
              <a href="#"><?php echo $row["fullname"];?></a>
              on <?php echo $row["time"];?></span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Post Content -->
  <article>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <?php echo $row["content"];?>
        </div>
      </div>
    </div>
  </article>

  <hr>
<?php
  }
  require "footer.php";
?>