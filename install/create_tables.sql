create table albums (
   id INT NOT NULL AUTO_INCREMENT,
   label VARCHAR(255) NOT NULL,
   description longtext,
   release_year int,
   PRIMARY KEY (id)
);
  
  
create table titles(
   id INT NOT NULL AUTO_INCREMENT,
   label VARCHAR(255) NOT NULL,
   PRIMARY KEY (id)
);
  
  
CREATE TABLE albums_titles_mapping (
    albums_id INT NOT NULL,
    titles_id INT NOT NULL,
    PRIMARY KEY (albums_id, titles_id),
    CONSTRAINT fk_albums FOREIGN KEY (albums_id) REFERENCES albums (id),
    CONSTRAINT fk_titles FOREIGN KEY (titles_id) REFERENCES titles (id)
);
