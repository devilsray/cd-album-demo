package local.demo;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface IArtistRepository extends PagingAndSortingRepository<Artist, Long> {
}
