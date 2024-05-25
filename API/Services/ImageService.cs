public class ImageService
{
    private readonly IWebHostEnvironment _env;

    public ImageService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return null;
        }

        var uploadsFolder = Path.Combine(_env.WebRootPath, "images");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return $"/images/{uniqueFileName}";
    }
}
