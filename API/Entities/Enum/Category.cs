using System.Text.Json.Serialization;
using System.ComponentModel;

namespace API.Entities.Enum
{
    [JsonConverter(typeof(EnumConverter))]
    public enum Category
    {
        Fantasy,
        ScienceFiction,
        HistoricalFiction,
        LiteraryFiction,
        Mystery,
        Thriller,
        AdventureFiction,
        Horror,
        ContemporaryFantasy,
        Memoir,
        Classics,
        ChildrensLiterature,
        ShortStory,
        YoungAdult,
        Biography,
        History,
        GraphicNovel,
        CrimeFiction,
        ContemporaryRomance,
        WomensFiction,
        Dystopian,
        ComedyHorror,
        Romance,
        DetectiveAndMystery
    }
}