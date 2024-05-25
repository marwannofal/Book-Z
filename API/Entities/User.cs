namespace API.Entities
{
    public class User
    {
        public int Id { get; set;}
        public string UserName { get; set;}
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Image { get; set; }
        
        // one user has list of this things:
        public List<Rating> Ratings { get; set; }
        public List<Book> Books { get; set; }
    }
}