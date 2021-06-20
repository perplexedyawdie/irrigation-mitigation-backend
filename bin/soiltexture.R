#install.packages('soiltexture')

needs( "soiltexture" ) 
attach(input[[1]])
my.text <- data.frame( 
  "CLAY"  = c(clay), 
  "SILT"  = c(silt), 
  "SAND"  = c(sand)
)   #

# Display the table:
#my.text


# Classify according to the USDA classification

# TT.points.in.classes( 
#   tri.data    = my.text[1,], 
#   class.sys   = "USDA.TT"  
# )   #



# Classify according to the HYPRES / European Soil Map classification, 
#   returns text, 
#   custom class separator in case of points belonging to 
#   several classes.
TT.points.in.classes( 
  tri.data    = my.text[1,], 
  class.sys   = "USDA.TT", 
  PiC.type    = "t", 
  collapse    = ";"
)   #