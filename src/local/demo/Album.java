package local.demo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "albums")
public class Album {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long        id;

  private String      label;

  @Column(columnDefinition = "LONGTEXT")
  private String      description;

  private Integer     year;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "albums_titles_mapping", joinColumns = { @JoinColumn(name = "albums_id") }, inverseJoinColumns = { @JoinColumn(name = "titles_id") })
  private List<Title> titles;

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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    this.year = year;
  }

  @Override
  public String toString() {
    return "Album [id=" + id + ", label=" + label + ", description=" + description + ", year=" + year + "]";
  }

  public List<Title> getTitles() {
    return titles;
  }

  public void setTitles(List<Title> titles) {
    this.titles = titles;
  }
}
