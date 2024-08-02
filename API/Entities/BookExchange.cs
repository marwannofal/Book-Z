namespace API.Entities
{
    public class BookExchange
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public DateTime ExchangeDate { get; set; }
    }
}