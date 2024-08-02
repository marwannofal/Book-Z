namespace API.Interfaces
{
    public interface IExchangeService
    {
        Task<bool> CanUserExchangeAsync(int userId);
        Task LogExchangeAsync(int userId, int bookId);
    }
}