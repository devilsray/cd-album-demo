package local.demo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface IAlbumRepository extends PagingAndSortingRepository<Album, Long> {
}
