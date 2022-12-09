module Main where
import Data.List
import Data.Set (Set)
import qualified Data.Set as Set

getWordsFromFile :: String -> IO [String]
getWordsFromFile file = readFile file >>= return . words

replace pos newVal list = take pos list ++ newVal : drop (pos+1) list

main :: IO ()
main = do
  wordList <- getWordsFromFile "input.txt"
  --print((expandMoves wordList []))
  --print((moveRopes (expandMoves wordList []) [] (0,0) (0,0))+1)
  print((moveRopes2 (expandMoves wordList []) [] (replicate 10 (0,0))))
	
moveRopes2 :: [String] -> [(Int, Int)] -> [(Int, Int)] -> Int
moveRopes2 [] tailList _ = length (Set.fromList tailList)
moveRopes2 moves tailList hts = moveRopes2 newmoves newlist newt
								where (newmoves, newlist, newt) = doMovement2((moves, tailList, hts))
												  
doMovement2 :: ([String], [(Int, Int)], [(Int, Int)]) -> ([String], [(Int, Int)], [(Int, Int)])
doMovement2 ((dir:movelist), tailList, ((hx,hy):lst)) = doMovementT2((movelist, tailList, newlst, 1)) where newlst = [(moveX dir hx hy)] ++ lst

doMovementT2 :: ([String], [(Int, Int)], [(Int, Int)], Int) -> ([String], [(Int, Int)], [(Int, Int)])
doMovementT2 (movelist, tailList, ys, pos) | pos == 9 = (movelist, tailList ++ [newY], replace pos newY ys)
										   | otherwise = doMovementT2(movelist, tailList, replace pos newY ys, pos+1)
										   where newY = updateY (ys !! (pos-1)) (ys !! pos)
													 
updateY :: (Int, Int) -> (Int, Int) -> (Int, Int)
updateY (hx, hy) (tx, ty) | abs diff_x > 1 || abs diff_y > 1 = (tx + signum diff_x, ty + signum diff_y)
					   | otherwise = (tx, ty)
					   where (diff_x, diff_y) = (hx-tx, hy-ty)										 
													 
												
  
expandMoves :: [String] -> [String] -> [String]
expandMoves [] newlist = newlist
expandMoves (dir:val:movelist) newlist = expandMoves movelist (newlist ++ (replicate (read val :: Int) dir))
expandMoves _ _ = []
	
moveRopes :: [String] -> [(Int, Int)] -> (Int, Int) -> (Int, Int) -> Int
moveRopes [] tailList _ _ = length (Set.fromList tailList)
moveRopes moves tailList h t = moveRopes newmoves newlist newh newt where (newmoves, newlist, newh, newt) = doMovement((moves, tailList, h, t))
												  
doMovement :: ([String], [(Int, Int)], (Int, Int), (Int, Int)) -> ([String], [(Int, Int)], (Int, Int), (Int, Int))
doMovement ((dir:movelist), tailList, (hx, hy), (tx, ty)) = doMovementT((movelist, tailList, newh, (tx, ty))) where newh = moveX dir hx hy

moveX :: String -> Int -> Int -> (Int, Int)
moveX dir x y | dir == "R" = (x+1, y)
				  | dir == "L" = (x-1, y)
				  | dir == "U" = (x, y+1)
				  | dir == "D" = (x, y-1)

doMovementT :: ([String], [(Int, Int)], (Int, Int), (Int, Int)) -> ([String], [(Int, Int)], (Int, Int), (Int, Int)) --repeats twice for value and add but idk
doMovementT (movelist, tailList, (hx, hy), (tx, ty)) | abs diff_x > 1 || abs diff_y > 1 = (movelist, tailList ++ [(tx + signum diff_x, ty + signum diff_y)], (hx, hy), (tx + signum diff_x, ty + signum diff_y))
													 | otherwise = (movelist, tailList, (hx, hy), (tx, ty))
													 where (diff_x, diff_y) = (hx-tx, hy-ty)
													 
													 