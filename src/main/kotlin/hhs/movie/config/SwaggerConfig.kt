package hhs.movie.config

// Kotlin
import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class SwaggerConfig {
    @Bean
    fun openAPI(): OpenAPI = OpenAPI()
            .components(Components())
            .info(apiInfo())

    private fun apiInfo() = Info()
            .title("Good-Hackathon MOVIEW")
            .description("API About Movie&Review")
            .version("1.0.0")
}