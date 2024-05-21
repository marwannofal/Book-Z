using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using API.Entities.Enum;

public class ConditionConverter : JsonConverter<Condition>
{
    public override Condition Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var enumString = reader.GetString();
        if (Enum.TryParse(enumString, true, out Condition condition))
        {
            return condition;
        }
        throw new JsonException($"Unable to convert \"{enumString}\" to {nameof(Condition)}.");
    }

    public override void Write(Utf8JsonWriter writer, Condition value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}
