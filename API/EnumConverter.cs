using System.Text.Json;
using System.Text.Json.Serialization;

public class EnumConverter<T> : JsonConverter<T> where T : struct, Enum
{
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var enumString = reader.GetString();
        if (Enum.TryParse(enumString, true, out T enumValue))
        {
            return enumValue;
        }
        throw new JsonException($"Unable to convert \"{enumString}\" to {typeof(T).Name}.");
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}