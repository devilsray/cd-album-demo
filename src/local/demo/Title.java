package local.demo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "titles")
public class Title {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long        id;

  private String      label;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "albums_titles_mapping", joinColumns = { @JoinColumn(name = "titles_id") }, inverseJoinColumns = { @JoinColumn(name = "albums_id") })
  private List<Album> albums;

  @OneToOne(targetEntity = Artist.class)
  @JoinColumn
  private Artist      artist;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public List<Album> getAlbums() {
    return albums;
  }

  public void setAlbums(List<Album> albums) {
    this.albums = albums;
  }

  public Artist getArtist() {
    return artist;
  }

  public void setArtist(Artist artist) {
    this.artist = artist;
  }
}
