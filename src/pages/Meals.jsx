import { Container, Grid, Card, CardContent, Typography, Stack, Divider } from "@mui/material";

export default function Meals({ meals }) {
  // Example meals data
   meals = [
     { type: "Breakfast", items: ["Pancakes", "Coffee"] },
     { type: "Lunch", items: ["Grilled Chicken", "Salad"] },
     { type: "Dinner", items: ["Steak", "Mashed Potato"] },
   ];

  return (
    <Container sx={{ mt: 3, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Fullboard for Today
      </Typography>

      <Grid container spacing={2}>
        {meals.map((meal) => (
          <Grid item xs={12} sm={6} md={4} key={meal.type}>
            <Card sx={{ minHeight: 150 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {meal.type}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Stack spacing={0.5}>
                  {meal.items.map((item, idx) => (
                    <Typography key={idx} variant="body1">
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    
  );
}