<?php
  require "header.php";
?>
  <!-- Page Header -->
  <header class="masthead" style="background-image: url('img/home-bg.jpg')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="site-heading">
            <h1>H3MN Blog</h1>
            <span class="subheading">An amazing IT blog.</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="post-preview">
          <?php
            $query = "SELECT * FROM post, users WHERE post.author_id = users.u_id";
            foreach($connection->query($query) as $row){
          ?>
            <a href="<?php echo "post.php?id= ".$row["p_id"].""; ?>">
              <div class="row">
                <div class="col-md-4 mt-2">
                  <img src="<?php echo $row["image"]?>" class="img-fluid" alt="<?php echo $row["title"];?>">
                </div>
                <div class="col-md-8">
                  <h2 class="post-title">
                    <?php echo $row["title"];?>
                  </h2>
                  <h3 class="post-subtitle">
                    <?php echo $row["subtitle"];?>
                  </h3>
                </div>
              </div>
            </a>
            <p class="post-meta">Posted by
              <a href="#"><?php echo $row["fullname"];?></a>
              on <?php echo $row["time"];?></p>
          <?php }?>
        </div>        
        <hr>
      </div>
    </div>
  </div>

  <hr>
<?php
  require "footer.php";
?>