using Google.Cloud.Storage.V1;

public class ImageService 
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName;

    public ImageService(IConfiguration configuration)
    {
        var keyFilePath = configuration["GoogleCloudStorage:KeyFilePath"];
        var credential = Google.Apis.Auth.OAuth2.GoogleCredential.FromFile(keyFilePath);
        _storageClient = StorageClient.Create(credential);
        _bucketName = configuration["GoogleCloudStorage:BucketName"];
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        var objectName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        using (var stream = file.OpenReadStream())
        {
            await _storageClient.UploadObjectAsync(_bucketName, objectName, file.ContentType, stream);
        }

        return $"https://storage.googleapis.com/{_bucketName}/{objectName}";
    }
}
