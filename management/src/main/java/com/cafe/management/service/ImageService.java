package com.cafe.management.service;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobStorageException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@Service
public class ImageService {

    @Value("${spring.cloud.azure.storage.blob.container-name}")
    private String containerName;

    @Value("${azure.blob-storage.connection-string}")
    private String connectionString;

    private BlobServiceClient blobServiceClient;

    @PostConstruct
    public void init() {
        blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
    }


    public String uploadImageWithCaption(MultipartFile imageFile) throws IOException {
        String blobFileName = imageFile.getOriginalFilename();
        BlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(blobFileName);

        blobClient.upload(imageFile.getInputStream(), imageFile.getSize(), true);




        return  blobClient.getBlobUrl();
    }

    //Not Working
    public String deleteImage(String blobFileName) {
        BlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(blobFileName);

        try {
            blobClient.delete();
            return "Image deleted successfully!";
        } catch (BlobStorageException e) {
            if (e.getStatusCode() == 404) {
                return "Image not found!";
            } else {
                return "An error occurred while deleting the image: " + e.getMessage();
            }
        }
    }
}
