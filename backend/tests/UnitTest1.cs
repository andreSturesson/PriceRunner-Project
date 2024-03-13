namespace tests;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void Test1()
    {
        Assert.Pass();
    }

    [Test]
    public void Test2()
    {
        Assert.That(2 + 2, Is.EqualTo(4));
    }
}